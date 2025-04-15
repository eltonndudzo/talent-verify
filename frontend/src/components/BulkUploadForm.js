import React, { useState } from 'react';
import axios from 'axios';

const BulkUploadForm = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    // Ensure the file is of type CSV or XLSX
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      setMessage("Please select a valid CSV or Excel file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        'https://orange-system-wrgvjxvw6j9whg744-8000.app.github.dev/api/upload/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Upload successful!');
    } catch (error) {
      setMessage(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="p-4 rounded bg-white shadow w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Bulk Upload Employees</h2>
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default BulkUploadForm;
