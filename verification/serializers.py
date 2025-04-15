from rest_framework import serializers
from .models import Company, Department, Employee, RoleHistory

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'

class RoleHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RoleHistory
        fields = '__all__'
        
class EmployeeSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    company_name = serializers.CharField(source= 'company.name', read_only=True)
    role_history = RoleHistorySerializer(many=True, read_only=True, source='rolehistory_set')

    class Meta:
        model = Employee
        fields = [
            'id',
            'name',
            'employee_id',
            'current_role',
            'company',
            'department',
            'company_name',
            'department_name',
            'role_history',
        ]
