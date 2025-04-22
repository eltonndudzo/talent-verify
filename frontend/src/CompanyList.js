import React, { useEffect, useState } from 'react';  // Import React and necessary hooks
import axios from 'axios';  // Import Axios for making API requests

const CompanyList = () => {
  // State to hold the list of companies fetched from the API
  const [companies, setCompanies] = useState([]);

  // useEffect hook runs once after the component mounts
  useEffect(() => {
    // Making a GET request to the API endpoint to fetch companies data
    axios.get('/api/companies/')
      .then(response => {
        // On successful response, log the fetched companies to console for debugging
        console.log('Fetched companies:', response.data);
        // Update state with the fetched companies data
        setCompanies(response.data);
      })
      .catch(error => {
        // Handle any errors during the fetch request
        console.error('Error fetching companies:', error);
      });
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div>
      {/* Display the section heading */}
      
      {/* List the companies dynamically */}
      <ul>
        {companies.map(company => (
          // For each company in the companies array, render a list item
          <li key={company.id}>
            {/* Display the company name in bold and the registration number */}
            <strong>{company.name}</strong> - {company.registration_number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
