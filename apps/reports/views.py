from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Report, ReportData, ReportVersion, Comment, CellLock
from .serializers import (ReportSerializer, ReportDataSerializer, 
                          ReportVersionSerializer, CommentSerializer, CellLockSerializer)
from authentication.permissions import IsSuperPrivileged, IsSuperPrivilegedOrPrivileged


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter reports by user if needed
        queryset = Report.objects.all().order_by('-created_at')
        status_filter = self.request.query_params.get('status', None)
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        return queryset
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsSuperPrivileged()]
        return [IsAuthenticated()]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=True, methods=['get'])
    def versions(self, request, pk=None):
        report = self.get_object()
        versions = report.versions.all()
        serializer = ReportVersionSerializer(versions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def create_snapshot(self, request, pk=None):
        report = self.get_object()
        latest_version = report.versions.order_by('-version_number').first()
        new_version_number = latest_version.version_number + 1 if latest_version else 1
        
        snapshot = ReportVersion.objects.create(
            report=report,
            snapshot_data=request.data.get('snapshot_data'),
            version_number=new_version_number,
            created_by=request.user,
            change_summary=request.data.get('change_summary', '')
        )
        return Response(ReportVersionSerializer(snapshot).data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def lock_cell(self, request, pk=None):
        report = self.get_object()
        cell_ref = request.data.get('cell_reference')
        
        existing_lock = CellLock.objects.filter(report=report, cell_reference=cell_ref).first()
        if existing_lock:
            return Response({'error': 'Cell already locked'}, status=status.HTTP_400_BAD_REQUEST)
        
        lock = CellLock.objects.create(
            report=report,
            cell_reference=cell_ref,
            locked_by=request.user
        )
        return Response(CellLockSerializer(lock).data, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['post'])
    def unlock_cell(self, request, pk=None):
        report = self.get_object()
        cell_ref = request.data.get('cell_reference')
        
        lock = CellLock.objects.filter(report=report, cell_reference=cell_ref).first()
        if lock:
            lock.delete()
            return Response({'message': 'Cell unlocked'}, status=status.HTTP_200_OK)
        return Response({'error': 'No lock found'}, status=status.HTTP_404_NOT_FOUND)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        comment = serializer.save(user=self.request.user)
        # Trigger notification for tagged users
        for user in comment.tagged_users.all():
            # Send notification logic here
            pass


# Alternative function-based endpoint for report list
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def report_list(request):
    """
    Alternative endpoint for retrieving reports list.
    Returns all reports ordered by creation date with optional status filtering.
    """
    queryset = Report.objects.all().order_by('-created_at')
    status_filter = request.query_params.get('status', None)
    
    if status_filter:
        queryset = queryset.filter(status=status_filter)
    
    serializer = ReportSerializer(queryset, many=True)
    return Response(serializer.data)
