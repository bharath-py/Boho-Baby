from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'email', 'role', 'is_staff', 'is_active', 'created_at']
    list_filter = ['role', 'is_staff', 'is_active']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['-created_at']
    
    # Make auto fields readonly
    readonly_fields = ['last_activity', 'created_at', 'updated_at', 'last_login', 'date_joined']
    
    # Add custom fields to the edit form (remove readonly fields from here)
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('role', 'profile_picture', 'phone_number', 'department', 'is_active_session')
        }),
        ('Timestamps', {
            'fields': ('last_activity', 'created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
    
    # Add custom fields to the "Add User" form
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Custom Fields', {
            'fields': ('role', 'phone_number', 'department')
        }),
    )
