from django.db import models
from .utils.fields import EncryptedCharField

# Company Model to store company-related information
class Company(models.Model):
    # Name of the company, not encrypted since it is not considered sensitive
    name = models.CharField(max_length=255, unique=True)
    # Registration date of the company
    registration_date = models.DateField()
    # Encrypted registration number for security
    registration_number = EncryptedCharField(max_length=100)
    # Encrypted address to protect sensitive company location details
    address = EncryptedCharField(max_length=500)
    # Encrypted contact person's name for sensitive information protection
    contact_person = EncryptedCharField(max_length=255)
    # The total number of employees in the company
    number_of_employees = models.IntegerField()
    # Encrypted contact phone number for security
    contact_phone = EncryptedCharField(max_length=50)
    # Encrypted company email address for communication
    email = EncryptedCharField(max_length=255)

    # String representation to return company name when referenced
    def __str__(self):
        return self.name


# Department Model to store department-related information within a company
class Department(models.Model):
    # Name of the department within the company
    name = models.CharField(max_length=255)
    # Foreign key to link the department to a company
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)

    # String representation to return department name along with the company name
    def __str__(self):
        return f"{self.name} ({self.company.name})"


# Employee Model to store employee information
class Employee(models.Model):
    # Name of the employee, which should be encrypted for privacy
    name = models.CharField(max_length=255)  # TODO: Encrypt this field
    # Employee ID is optional and can be left blank
    employee_id = models.CharField(max_length=100, blank=True, null=True)
    # Foreign key to associate the employee with a specific company
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    # Foreign key to associate the employee with a specific department, can be null if not assigned
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    # Current role the employee holds within the company
    current_role = models.CharField(max_length=255)

    # String representation to return the employee's name
    def __str__(self):
        return self.name


# RoleHistory Model to store the historical roles an employee has held within a company
class RoleHistory(models.Model):
    # Foreign key to associate the role history with a specific employee
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='role_histories')
    # Foreign key to associate the role history with a specific company
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='role_histories')
    # The role the employee held at the company during the period
    role = models.CharField(max_length=255)
    # The date the employee started in this role
    date_started = models.DateField()
    # The date the employee left the role, can be null if they are still in the role
    date_left = models.DateField(null=True, blank=True)
    # The duties and responsibilities associated with the role
    duties = models.CharField(max_length=1000)

    # String representation to return a combination of the employee's name and role for easier reference
    def __str__(self):
        return f"{self.employee.name} - {self.role}"
