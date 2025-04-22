import React, { useEffect, useState } from 'react';
import axios from 'axios';

// This component handles adding a new employee to the system
const AddEmployeeForm = () => {

  // Store the list of companies fetched from the backend
  const [companies, setCompanies] = useState([]);

  // Store the list of departments for the selected company
  const [departments, setDepartments] = useState([]);

  // Form data state to store input values for the new employee
  const [formData, setFormData] = useState({
    name: '',            // Employee full name
    employee_id: '',     // Optional: Employee ID (can be blank)
    company: '',         // Selected company ID (dropdown)
    department: '',      // Selected department ID (dropdown)
    current_role: ''     // Current role title
  });

  // For displaying any error messages to the user
  const [error, setError] = useState('');

  // For displaying success message on successful submission
  const [success, setSuccess] = useState('');

  // Fetch all companies when the component first loads (initial render)
  useEffect(() => {
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/')
      .then(res => setCompanies(res.data)) // Store companies in state
      .catch(err => setError('Failed to load companies.')); // Handle error if request fails
  }, []);

  // When a company is selected, fetch the departments for that company
  useEffect(() => {
    if (formData.company) {
      axios.get(`https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/${formData.company}/departments/`)
        .then(res => setDepartments(res.data)) // Update the departments dropdown
        .catch(err => setError('Failed to load departments.')); // Show error if something goes wrong
    }
  }, [formData.company]); // Dependency array means this only runs when company value changes

  // Handle form input changes (for text fields and dropdowns)
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Convert string to number for dropdowns, leave strings as-is for text inputs
    const parsedValue = (name === 'company' || name === 'department') ? parseInt(value) : value;

    // Update form state with the new input
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  // Handle form submission: sends the employee data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form reload
    setError('');
    setSuccess('');

    try {
      // Post the form data to the /api/employees/ endpoint
      const response = await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/',
        formData
      );

      // Show success message and clear the form
      setSuccess('Employee added!');
      setFormData({
        name: '',
        employee_id: '',
        company: '',
        department: '',
        current_role: ''
      });

    } catch (err) {
      // Show error message from API response (or default error)
      setError(err.response?.data || 'Failed to add employee');
      console.error('Employee add error:', err.response?.data || err.message);
    }
  };

  // Render the form UI
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto' }}>

      {/* Show error or success messages */}
      {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Input for employee name */}
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      /><br /><br />

      {/* Optional input for employee ID */}
      <input
        name="employee_id"
        placeholder="Employee ID"
        value={formData.employee_id}
        onChange={handleChange}
      /><br /><br />

      {/* Dropdown to select company */}
      <select
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      >
        <option value="">Select Company</option>
        {companies.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select><br /><br />

      {/* Dropdown to select department (loaded dynamically based on company) */}
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        {departments.map(d => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select><br /><br />

      {/* Input for current role */}
      <input
        name="current_role"
        placeholder="Current Role"
        value={formData.current_role}
        onChange={handleChange}
        required
      /><br /><br />

      {/* Submit button */}
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;

