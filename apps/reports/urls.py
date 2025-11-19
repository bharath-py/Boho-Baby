from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReportViewSet, CommentViewSet, report_list



router = DefaultRouter()
router.register(r'reports', ReportViewSet, basename='report')
router.register(r'comments', CommentViewSet, basename='comment')



urlpatterns = [
    # Router-based endpoints (ViewSets)
    path('', include(router.urls)),
    
    # Alternative function-based endpoint
    path('reports-list/', report_list, name='report-list'),
]
