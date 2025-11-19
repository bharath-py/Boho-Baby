from rest_framework import serializers
from .models import UserActivity
from users.serializers import UserSerializer
from reports.serializers import ReportSerializer

class UserActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    report = ReportSerializer(read_only=True)

    class Meta:
        model = UserActivity
        fields = ['id', 'user', 'report', 'activity_type', 'timestamp', 'metadata']
        read_only_fields = ['id', 'timestamp']
