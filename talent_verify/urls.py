from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from verification import views
from django.http import HttpResponse

# Home view
def home(request):
    return HttpResponse("<h1>Welcome to Talent Verify</h1>")

# Create a router to automatically map our viewsets to URLs
router = DefaultRouter()
router.register(r'companies', views.CompanyViewSet)
router.register(r'departments', views.DepartmentViewSet)
router.register(r'employees', views.EmployeeViewSet)

# Add URL patterns
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home),  # This will handle the homepage route
    path('api/', include("verification.urls")),
]


