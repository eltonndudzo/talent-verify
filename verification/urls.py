from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, DepartmentViewSet, EmployeeViewSet, RoleHistoryViewSet, BulkUploadView

router = DefaultRouter()
router.register(r'companies', CompanyViewSet, basename='company')
router.register(r'departments', DepartmentViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'roles', RoleHistoryViewSet)

urlpatterns = [
    path('', include(router.urls)),  # ✅ now your API routes are active
]

urlpatterns += [
    path('upload/', BulkUploadView.as_view(), name='bulk-upload'),
]