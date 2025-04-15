import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddEmployeeForm = () => {
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    company: '',
    department: '',
    current_role: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/')
      .then(res => setCompanies(res.data))
      .catch(err => setError('Failed to load companies.'));
  }, []);

  useEffect(() => {
    if (formData.company) {
      axios.get(`https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/${formData.company}/departments/`)
        .then(res => setDepartments(res.data))
        .catch(err => setError('Failed to load departments.'));
    }
  }, [formData.company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Convert to number for dropdowns, keep string for text inputs
    const parsedValue = (name === 'company' || name === 'department') ? parseInt(value) : value;
  
    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/',
        formData
      );
      setSuccess('Employee added!');
      setFormData({
        name: '',
        employee_id: '',
        company: '',
        department: '',
        current_role: ''
      });
    } catch (err) {
      setError(err.response?.data || 'Failed to add employee');
      console.error('Employee add error:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '2rem auto' }}>
      <h2>Add Employee</h2>

      {error && <p style={{ color: 'red' }}>Error: {JSON.stringify(error)}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      /><br /><br />

      <input
        name="employee_id"
        placeholder="Employee ID"
        value={formData.employee_id}
        onChange={handleChange}
      /><br /><br />

      <select
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      >
        <option value="">Select Company</option>
        {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select><br /><br />

      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        required
      >
        <option value="">Select Department</option>
        {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
      </select><br /><br />

      <input
        name="current_role"
        placeholder="Current Role"
        value={formData.current_role}
        onChange={handleChange}
        required
      /><br /><br />

      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployeeForm;
