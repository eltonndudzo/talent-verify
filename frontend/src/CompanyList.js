import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get('/api/companies/')
    .then(response => {
      console.log('Fetched companies:', response.data);  
      setCompanies(response.data);
    })
      .catch(error => {
        console.error('Error fetching companies:', error);
      });
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      <ul>
        {companies.map(company => (
          <li key={company.id}>
            <strong>{company.name}</strong> - {company.registration_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
