from django.db import models
from .utils.fields import EncryptedCharField

class Company(models.Model):
    name = models.CharField(max_length=255)  
    registration_date = models.DateField()
    registration_number = EncryptedCharField(max_length=100)
    address = EncryptedCharField(max_length=500)  # Change from TextField to EncryptedCharField
    contact_person = EncryptedCharField(max_length=255)
    number_of_employees = models.IntegerField()
    contact_phone = EncryptedCharField(max_length=50)
    email = EncryptedCharField(max_length=255)

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, related_name='departments', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.company.name})"

class Employee(models.Model):
    name = models.CharField(max_length=255)  # Encrypt employee name
    employee_id = models.CharField(max_length=100, blank=True, null=True)
    company = models.ForeignKey(Company, related_name='employees', on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True)
    current_role = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class RoleHistory(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='role_histories')
    company = models.ForeignKey(Company, related_name='employees', on_delete=models.CASCADE)
    role = models.CharField(max_length=255)  
    date_started = models.DateField()
    date_left = models.DateField(null=True, blank=True)
    duties = models.CharField(max_length=1000)  

    def __str__(self):
        return f"{self.employee.name} - {self.role}"


