import csv
import io
import openpyxl
from rest_framework import viewsets, filters, status
from .models import Company, Department, Employee, RoleHistory
from .serializers import CompanySerializer, DepartmentSerializer, EmployeeSerializer, RoleHistorySerializer
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser


# --- Handle CSV Upload ---
def handle_csv_upload(file):
    decoded_file = file.read().decode('utf-8')  # Decode bytes to string
    io_string = io.StringIO(decoded_file)       # Use StringIO to mimic file object
    reader = csv.DictReader(io_string)          # Read CSV as dictionary

    for row in reader:
        try:
            registration_number = row['registration_number']
            registration_date = row['registration_date']

            # Prevent duplicate companies using get_or_create with defaults
            company, _ = Company.objects.get_or_create(
                name=row['company'],
                defaults={
                    'registration_number': registration_number,
                    'registration_date': registration_date,
                    'address': row['address'],
                    'contact_person': row['contact_person'],
                    'contact_phone': row['contact_phone'],
                    'email': row['email'],
                    'number_of_employees': row['number_of_employees']
                }
            )

            # Get or create department
            department, _ = Department.objects.get_or_create(name=row['department'], company=company)

            # Create employee (you can add checks here later to prevent duplicate employees)
            Employee.objects.create(
                name=row['name'],
                employee_id=row.get('employee_id', ''),
                company=company,
                department=department,
                current_role=row.get('role', '')
            )
        except Exception as e:
            raise ValidationError(str(e))


# --- Handle Excel Upload ---
def handle_excel_upload(file):
    wb = openpyxl.load_workbook(file)
    sheet = wb.active

    for row in sheet.iter_rows(min_row=2, values_only=True):  # Skip header
        try:
            registration_number = row[0]
            registration_date = row[1]

            company, _ = Company.objects.get_or_create(
                name=row[2],
                defaults={
                    'registration_number': registration_number,
                    'registration_date': registration_date,
                    'address': row[3],
                    'contact_person': row[4],
                    'contact_phone': row[5],
                    'email': row[6],
                    'number_of_employees': row[7]
                }
            )

            department, _ = Department.objects.get_or_create(name=row[8], company=company)

            Employee.objects.create(
                name=row[9],
                employee_id=row[10] if row[10] else '',
                company=company,
                department=department,
                current_role=row[11] if row[11] else ''
            )
        except Exception as e:
            raise ValidationError(str(e))


# --- Bulk Upload API ---
class BulkUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        file = request.FILES.get('file')

        if not file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

        if file.name.endswith('.csv'):
            try:
                handle_csv_upload(file)
            except ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        elif file.name.endswith('.xlsx'):
            try:
                handle_excel_upload(file)
            except ValidationError as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Unsupported file format'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'Upload successful'}, status=status.HTTP_201_CREATED)


# --- Company ViewSet ---
class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response({"detail": f"Validation error: {e}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": f"Unexpected error: {e}"}, status=status.HTTP_400_BAD_REQUEST)

    # Custom action to get all departments for a specific company
    @action(detail=True, methods=['get'])
    def departments(self, request, pk=None):
        company = self.get_object()
        departments = company.departments.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)


# --- Department ViewSet ---
class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    permission_classes = [AllowAny]


# --- Employee ViewSet ---
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'employee_id', 'current_role', 'department__name', 'company__name']
    permission_classes = [AllowAny]

    # Custom action to get role history for an employee
    @action(detail=True, methods=['get'])
    def role_history(self, request, pk=None):
        employee = self.get_object()
        role_history = employee.role_histories.all().order_by('-date_started')
        serializer = RoleHistorySerializer(role_history, many=True)
        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        print("Search Query:", request.query_params.get('search'))
        return super().list(request, *args, **kwargs)


# --- Role History ViewSet ---
class RoleHistoryViewSet(viewsets.ModelViewSet):
    queryset = RoleHistory.objects.all()
    serializer_class = RoleHistorySerializer
    permission_classes = [AllowAny]
