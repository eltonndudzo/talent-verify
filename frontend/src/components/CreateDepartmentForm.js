import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateDepartmentForm = () => {
  // State for department name, selected company, list of companies, and message
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch the list of companies on component mount
  useEffect(() => {
    axios
      .get('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/')
      .then(response => setCompanies(response.data))
      .catch(error => console.error('Error fetching companies:', error));
  }, []);

  // Submit handler to create a department
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/departments/',
        {
          name,
          company: companyId, // This assumes your backend expects 'company' as a foreign key ID
        }
      );
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
      <form onSubmit={handleSubmit}>
        {/* Input for department name */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
        </div>

        {/* Dropdown for selecting a company */}
        <div style={{ marginBottom: '1rem' }}>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            style={{
              padding: '0.5rem',
              width: '100%',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          >
            <option value="">Select Company</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px'
          }}
        >
          Create
        </button>
      </form>

      {/* Success or error message */}
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default CreateDepartmentForm;
