from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import UserActivity
from .serializers import UserActivitySerializer

class UserActivityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = UserActivity.objects.all()
    serializer_class = UserActivitySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Optionally filter by requesting user or implement admin access
        return super().get_queryset()
