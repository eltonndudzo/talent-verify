import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateDepartmentForm = () => {
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/departments/', {
        name,
        company: companyId,
      });
      setMessage('Department created successfully!');
      setName('');
      setCompanyId('');
    } catch (error) {
      console.error('Error creating department:', error);
      setMessage('Failed to create department.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create Department</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', borderRadius: '6px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', borderRadius: '6px' }}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>{company.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px' }}>
          Create
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default CreateDepartmentForm;
