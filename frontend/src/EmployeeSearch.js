import React, { useState } from 'react';
import axios from 'axios';

const EmployeeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [roleHistories, setRoleHistories] = useState({});
  const [loadingRoleHistory, setLoadingRoleHistory] = useState({});

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/?search=${query}`
      );
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const fetchRoleHistory = async (employeeId) => {
    console.log('Fetching history for employee:', employeeId);
    
    if (loadingRoleHistory[employeeId]) return;

    setLoadingRoleHistory((prev) => ({ ...prev, [employeeId]: true }));

    try {
      const response = await axios.get(
        `https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/employees/${employeeId}/role_history/`
      );
      setRoleHistories((prev) => ({
        ...prev,
        [employeeId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching role history:', error);
    } finally {
      setLoadingRoleHistory((prev) => ({ ...prev, [employeeId]: false }));
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Search Employees</h2>
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
            <h3>{employee.name}</h3>
            <p><strong>Employee ID:</strong> {employee.employee_id}</p>
            <p><strong>Company:</strong> {employee.company_name}</p>
            <p><strong>Department:</strong> {employee.department_name}</p>
            <p><strong>Current Role:</strong> {employee.current_role}</p>

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
