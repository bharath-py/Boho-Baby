from rest_framework import serializers
from .models import Report, ReportData, ReportVersion, Comment, CellLock
from users.serializers import UserSerializer

class ReportSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = Report
        fields = ['id', 'title', 'description', 'status', 'data', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['created_by', 'created_at', 'updated_at']

class ReportDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportData
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by', 'version']

class ReportVersionSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    
    class Meta:
        model = ReportVersion
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    tagged_users = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class CellLockSerializer(serializers.ModelSerializer):
    locked_by = UserSerializer(read_only=True)
    
    class Meta:
        model = CellLock
        fields = '__all__'
        read_only_fields = ['locked_by', 'locked_at']