from rest_framework import permissions

class IsSuperPrivileged(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'super_privileged'

class IsSuperPrivilegedOrPrivileged(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role in ['super_privileged', 'privileged']

class IsNormalUserOrAbove(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated
