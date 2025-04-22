from rest_framework import serializers
from .models import Company, Department, Employee, RoleHistory

# Serializer for the Company model
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        # Meta class defines the model and the fields to include in the serialized output
        model = Company
        fields = '__all__'  # Include all fields from the Company model

# Serializer for the Department model
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'  # Include all fields from the Department model

#Serializer for the RoleHistory model
class RoleHistorySerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = RoleHistory
        fields = '__all__'  # Includes model fields
        extra_fields = ['company_name']  # Explicitly include this custom field


# Serializer for the Employee model
class EmployeeSerializer(serializers.ModelSerializer):
    # The department_name field will represent the department's name for the employee
    department_name = serializers.CharField(source='department.name', read_only=True)
    # The company_name field will represent the company's name for the employee
    company_name = serializers.CharField(source='company.name', read_only=True)
    # The role_history field will include a list of role histories for the employee
    role_history = RoleHistorySerializer(many=True, read_only=True, source='rolehistory_set')

    class Meta:
        model = Employee
        fields = [
            'id',               # The employee's ID
            'name',             # The employee's name
            'employee_id',      # The employee's employee ID
            'current_role',     # The employee's current role in the company
            'company',          # The employee's company (as a foreign key)
            'department',       # The employee's department (as a foreign key)
            'company_name',     # The name of the company, fetched through the relationship
            'department_name',  # The name of the department, fetched through the relationship
            'role_history',     # The role history of the employee, fetched through the relationship
        ]
