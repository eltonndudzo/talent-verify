import React from 'react';
import CompanyList from './CompanyList';
import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeeSearch from './EmployeeSearch';
import BulkUploadForm from './components/BulkUploadForm';
import AddRoleHistoryForm from './components/AddRoleHistoryForm';
import CreateCompanyForm from './components/CreateCompanyForm';
import CreateDepartmentForm from './components/CreateDepartmentForm';

function App() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-center text-4xl font-semibold text-gray-800 mb-10">Talent Verify</h1>
      
      {/* Create Company Form */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Create Company</h3>
          <CreateCompanyForm />
        </div>
      </section>

      {/* Create Department Form */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Create Department</h3>
          <CreateDepartmentForm />
        </div>
      </section>

      {/* Add Employee Form */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Employee</h3>
          <AddEmployeeForm />
        </div>
      </section>

      {/* Add Role History Form */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Role History</h3>
          <AddRoleHistoryForm />
        </div>
      </section>

      {/* Employee Search */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Search Employees</h3>
          <EmployeeSearch />
        </div>
      </section>

      {/* Bulk Upload Form */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Bulk Upload</h3>
          <BulkUploadForm />
        </div>
      </section>

      {/* Company List */}
      <section className="mb-10">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Company List</h3>
          <CompanyList />
        </div>
      </section>
    </div>
  );
}

export default App;
