from django.db import models
from users.models import User
from reports.models import Report

class UserActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    report = models.ForeignKey(Report, on_delete=models.CASCADE, null=True, blank=True)
    activity_type = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)
    
    class Meta:
        db_table = 'user_activities'
        ordering = ['-timestamp']
