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
    <div className="App">
      <h1>Talent Verify</h1>
      <CreateCompanyForm />
      <CreateDepartmentForm />
      <AddEmployeeForm />
      <AddRoleHistoryForm />
      <EmployeeSearch />
      <BulkUploadForm />
      <CompanyList />
    </div>
  );
}

export default App;


