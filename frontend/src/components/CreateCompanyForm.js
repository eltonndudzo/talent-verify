import React, { useState } from 'react';
import axios from 'axios';

const CreateCompanyForm = () => {
  // Initialize form state with empty values
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

  // Update form data when input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to backend API
      const response = await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/companies/',
        formData
      );

      setMessage('Company created successfully!');

      // Reset form fields to initial state
      setFormData({
        name: '',
        registration_number: '',
        registration_date: '',
        address: '',
        contact_person: '',
        number_of_employees: '',
        contact_phone: '', 
        email: ''
      });
    } catch (error) {
      console.error('Error creating company:', error.response ? error.response.data : error);
      setMessage(error.response ? error.response.data.detail : 'Failed to create company.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <form onSubmit={handleSubmit}>
        {/* Dynamically render each input field */}
        {[
          'name',
          'registration_number',
          'registration_date',
          'address',
          'contact_person',
          'number_of_employees',
          'contact_phone',
          'email'
        ].map((field) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <input
              type={field.includes('date') ? 'date' : 'text'} // Use date input for date fields
              name={field}
              placeholder={field.replace(/_/g, ' ')} // Convert snake_case to readable labels
              value={formData[field]}
              onChange={handleChange}
              style={{
                padding: '0.5rem',
                width: '100%',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
          </div>
        ))}

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

export default CreateCompanyForm;
