from django.contrib import admin
from .models import Company, Department, Employee, RoleHistory

admin.site.register(Company)
admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(RoleHistory)
