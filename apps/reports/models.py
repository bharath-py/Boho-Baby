from django.db import models
from users.models import User

class Report(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_reports')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_locked = models.BooleanField(default=False)
    deadline = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'reports'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title

class ReportData(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='data')
    spreadsheet_data = models.JSONField()
    version = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'report_data'
        ordering = ['-version']

class ReportVersion(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='versions')
    snapshot_data = models.JSONField()
    version_number = models.IntegerField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    change_summary = models.TextField(blank=True)
    
    class Meta:
        db_table = 'report_versions'
        ordering = ['-version_number']

class Comment(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    cell_reference = models.CharField(max_length=50, blank=True)
    tagged_users = models.ManyToManyField(User, related_name='tagged_comments', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'comments'
        ordering = ['created_at']

class CellLock(models.Model):
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='cell_locks')
    cell_reference = models.CharField(max_length=50)
    locked_by = models.ForeignKey(User, on_delete=models.CASCADE)
    locked_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'cell_locks'
        unique_together = ['report', 'cell_reference']
