import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Component to add an employee's previous or current role history
const RoleHistoryForm = () => {
  // State to store list of employees and companies for dropdowns
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Form input state
  const [formData, setFormData] = useState({
    employee: '',       // selected employee ID
    company: '',        // selected company ID
    role: '',           // role title
    duties: '',         // job responsibilities
    date_started: '',   // role start date
    date_left: ''       // role end date (optional)
  });

  // Message to show success or error feedback
  const [message, setMessage] = useState('');

  // Fetch employee and company lists when component mounts
  useEffect(() => {
    // Load employee options
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error fetching employees:', err));

    // Load company options
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/')
      .then(res => setCompanies(res.data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  // Update form input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    try {
      // Send POST request with form data
      const res = await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/roles/',
        formData
      );

      // On success, show message and reset form
      setMessage('Role history added!');
      setFormData({
        employee: '',
        company: '',
        role: '',
        duties: '',
        date_started: '',
        date_left: ''
      });
    } catch (err) {
      // Handle errors from backend
      console.error("Backend error:", err.response?.data);
      setMessage('Error adding role history: ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Dropdown to select employee */}
      <select
        name="employee"
        value={formData.employee}
        onChange={handleChange}
        required
      >
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>

      {/* Dropdown to select company */}
      <select
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      >
        <option value="">Select Company</option>
        {companies.map(comp => (
          <option key={comp.id} value={comp.id}>{comp.name}</option>
        ))}
      </select>

      {/* Role title input */}
      <input
        name="role"
        placeholder="Role Title"
        value={formData.role}
        onChange={handleChange}
        required
      />

      {/* Duties input */}
      <textarea
        name="duties"
        placeholder="Duties"
        value={formData.duties}
        onChange={handleChange}
        required
      />

      {/* Date input for start date */}
      <label>
        Start Date:
        <input
          name="date_started"
          type="date"
          value={formData.date_started}
          onChange={handleChange}
          required
        />
      </label>

      {/* Date input for end date (optional) */}
      <label>
        End Date:
        <input
          name="date_left"
          type="date"
          value={formData.date_left}
          onChange={handleChange}
        />
      </label>

      {/* Submit button */}
      <button type="submit">Add Role History</button>

      {/* Show success or error message */}
      {message && <p>{message}</p>}
    </form>
  );
};

export default RoleHistoryForm;
