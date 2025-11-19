from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Report, ReportVersion

@receiver(post_save, sender=Report)
def create_initial_version(sender, instance, created, **kwargs):
    if created:
        ReportVersion.objects.create(
            report=instance,
            snapshot_data={},  # Optionally add initial data snapshot
            version_number=1,
            created_by=instance.created_by,
            change_summary="Initial version"
        )
