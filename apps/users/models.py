from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    USER_ROLES = (
        ('super_privileged', 'Super Privileged'),
        ('privileged', 'Privileged'),
        ('normal', 'Normal User'),
    )
    
    role = models.CharField(max_length=20, choices=USER_ROLES, default='normal')
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    department = models.CharField(max_length=100, blank=True)
    is_active_session = models.BooleanField(default=False)
    last_activity = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
