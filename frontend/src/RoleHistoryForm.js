import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoleHistoryForm = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee: '',
    role: '',
    date_started: '',
    date_left: '',
    duties: ''
  });

  useEffect(() => {
    // Fetch employees so user can select who the role history is for
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/')
      .then(res => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/rolehistories/', formData)
      .then(() => alert('Role history added!'))
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Role History</h2>

      <select name="employee" onChange={handleChange} required>
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>

      <input name="role" placeholder="Role" onChange={handleChange} required />
      <input name="date_started" type="date" onChange={handleChange} required />
      <input name="date_left" type="date" onChange={handleChange} />
      <textarea name="duties" placeholder="Duties" onChange={handleChange} required />

      <button type="submit">Add Role History</button>
    </form>
  );
};

export default RoleHistoryForm;
