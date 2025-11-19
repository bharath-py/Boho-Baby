from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer, UserCreateSerializer
from authentication.permissions import IsSuperPrivilegedOrPrivileged

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsSuperPrivilegedOrPrivileged()]
        return [IsAuthenticated()]
    
    @action(detail=False, methods=['get'])
    def active_users(self, request):
        active = User.objects.filter(is_active_session=True)
        serializer = self.get_serializer(active, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def change_role(self, request, pk=None):
        user = self.get_object()
        new_role = request.data.get('role')
        if new_role not in dict(User.USER_ROLES):
            return Response({'error': 'Invalid role'}, status=status.HTTP_400_BAD_REQUEST)
        user.role = new_role
        user.save()
        return Response(UserSerializer(user).data)
