import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleHistoryForm = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    employee: '',
    company: '', 
    role: '',
    duties: '',
    date_started: '',
    date_left: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Error fetching employees:', err));

    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/')
      .then(res => setCompanies(res.data))
      .catch(err => console.error('Error fetching companies:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/roles/',
        formData
      );
      setMessage('Role history added!');
      setFormData({
        employee: '',
        company: '', // Reset company here
        role: '',
        duties: '',
        date_started: '',
        date_left: ''
      });
    } catch (err) {
      console.error("Backend error:", err.response?.data);
      setMessage('Error adding role history: ' + JSON.stringify(err.response?.data));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Role History</h2>

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

      <input
        name="role"
        placeholder="Role Title"
        value={formData.role}
        onChange={handleChange}
        required
      />

      <textarea
        name="duties"
        placeholder="Duties"
        value={formData.duties}
        onChange={handleChange}
        required
      />

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

      <label>
        End Date:
        <input
          name="date_left"
          type="date"
          value={formData.date_left}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Add Role History</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RoleHistoryForm;
