import React, { useState } from 'react';
import axios from 'axios';

const CreateCompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    registration_number: '',
    registration_date: '',
    address: '',
    contact_person: '',
    number_of_employees: '',
    contact_phone: '',
    email: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
       try {
      const response = await axios.post('https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/', formData);
      setMessage('Company created successfully!');
      setFormData({
        name: '',
        registration_number: '',
        registration_date: '',
        address: '',
        contact_person: '',
        number_of_employees: '',
        phone: '',
        email: ''
      });
    } catch (error) {
      console.error('Error creating company:', error.response ? error.response.data : error);
      setMessage(error.response ? error.response.data.detail : 'Failed to create company.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Create Company</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'registration_number', 'registration_date', 'address', 'contact_person', 'number_of_employees', 'contact_phone', 'email'].map((field) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <input
              type={field.includes('date') ? 'date' : 'text'}
              name={field}
              placeholder={field.replace(/_/g, ' ')}
              value={formData[field]}
              onChange={handleChange}
              style={{ padding: '0.5rem', width: '100%', borderRadius: '6px', border: '1px solid #ccc' }}
            />
          </div>
        ))}
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '6px' }}>
          Create
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default CreateCompanyForm;
