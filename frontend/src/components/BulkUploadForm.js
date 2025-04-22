import React, { useState } from 'react';
import axios from 'axios';

// Component for bulk uploading employees via CSV or Excel file
const BulkUploadForm = () => {
  const [file, setFile] = useState(null);     // stores the selected file
  const [message, setMessage] = useState(''); // shows success or error feedback

  // When a user selects a file
  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Save the file to state
  };

  // Upload file to backend
  const handleUpload = async () => {
    // Ensure user selected a file
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    // Check that file is either .csv or .xlsx (Excel)
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      setMessage("Please select a valid CSV or Excel file.");
      return;
    }

    // Prepare file for upload using FormData
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send file to backend endpoint
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
      // Show backend error if upload fails
      setMessage(`Upload failed: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div className="p-4 rounded bg-white shadow w-full max-w-lg mx-auto">

      {/* File input (only allows .csv or .xlsx files) */}
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileChange}
        className="mb-2"
      />

      {/* Upload button */}
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      {/* Display feedback message */}
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default BulkUploadForm;
