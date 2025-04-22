import React, { useState } from 'react';  // Import React and useState hook
import axios from 'axios';  // Axios for making API requests

const EmployeeSearch = () => {
  // States for managing the search input, results, role history data, and loading states
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [roleHistories, setRoleHistories] = useState({});
  const [loadingRoleHistory, setLoadingRoleHistory] = useState({});

  // Handle employee search based on query
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/?search=${query}`
      );
      setResults(response.data);  // Save employee search results
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Fetch role history for a specific employee
  const fetchRoleHistory = async (employeeId) => {
    if (loadingRoleHistory[employeeId]) return;  // Avoid duplicate loading
    setLoadingRoleHistory((prev) => ({ ...prev, [employeeId]: true }));

    try {
      const response = await axios.get(
        `https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/${employeeId}/role_history/`
      );
      setRoleHistories((prev) => ({
        ...prev,
        [employeeId]: response.data,  // Save role history for the employee
      }));
    } catch (error) {
      console.error('Error fetching role history:', error);
    } finally {
      setLoadingRoleHistory((prev) => ({ ...prev, [employeeId]: false }));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by name, department, etc."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: '0.5rem',
          width: '60%',
          marginRight: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />
      {/* Search button */}
      <button
        onClick={handleSearch}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Search
      </button>

      {/* Results section */}
      <div style={{ marginTop: '2rem' }}>
        {results.map((employee) => (
          <div
            key={employee.id}
            style={{
              border: '1px solid #ddd',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            }}
          >
            {/* Employee details */}
            <h3>{employee.name}</h3>
            <p><strong>Employee ID:</strong> {employee.employee_id}</p>
            <p><strong>Company:</strong> {employee.company_name}</p>
            <p><strong>Department:</strong> {employee.department_name}</p>
            <p><strong>Current Role:</strong> {employee.current_role}</p>

            {/* Role history button */}
            <button
              onClick={() => fetchRoleHistory(employee.id)}
              disabled={loadingRoleHistory[employee.id]}
              style={{
                marginTop: '0.5rem',
                padding: '0.5rem',
                borderRadius: '6px',
                backgroundColor: loadingRoleHistory[employee.id] ? '#ccc' : '#4CAF50',
                color: 'white',
                cursor: loadingRoleHistory[employee.id] ? 'not-allowed' : 'pointer',
              }}
            >
              {loadingRoleHistory[employee.id] ? 'Loading...' : 'View Role History'}
            </button>

            {/* Display role history if loaded */}
            {roleHistories[employee.id] && (
              <div style={{ marginTop: '1rem' }}>
                <h4>Role History:</h4>
                {roleHistories[employee.id].length === 0 ? (
                  <p style={{ fontStyle: 'italic', color: '#777' }}>No role history available.</p>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Duties</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Start Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>End Date</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Company</th> {/* 🆕 */}
                      </tr>
                    </thead>
                    <tbody>
                      {roleHistories[employee.id].map((role, idx) => (
                        <tr key={idx}>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.role}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.duties}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{role.date_started}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {role.date_left || 'Present'}
                          </td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                            {role.company_name}
                          </td> {/* 🆕 Display company */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeSearch;
