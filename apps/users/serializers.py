from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 
                  'role', 'profile_picture', 'phone_number', 'department',
                  'is_active_session', 'last_activity', 'created_at']
        read_only_fields = ['id', 'created_at', 'last_activity']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 
                  'role', 'phone_number', 'department']
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
