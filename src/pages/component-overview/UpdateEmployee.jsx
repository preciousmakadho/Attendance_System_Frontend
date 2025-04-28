import React from 'react';

const UpdateEmployee = ({ employee, onBack }) => {
  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Update Employee</h2>
      <div className="mb-4">
        <strong>Name:</strong> 
        <input 
          type="text" 
          className="ml-2 p-1 border rounded"
          defaultValue={employee.name}
        />
      </div>
      <div className="mb-4">
        <strong>Email:</strong> 
        <input 
          type="email" 
          className="ml-2 p-1 border rounded"
          defaultValue={employee.email}
        />
      </div>
      <div className="mb-4">
        <strong>Phone Number:</strong> 
        <input 
          type="text" 
          className="ml-2 p-1 border rounded"
          defaultValue={employee.phone}
        />
      </div>
      <div className="mb-4">
        <strong>Designation:</strong> 
        <input 
          type="text" 
          className="ml-2 p-1 border rounded"
          defaultValue={employee.designation}
        />
      </div>
      <div className="mb-4">
        <strong>Authorized:</strong> 
        <select 
          className="ml-2 p-1 border rounded"
          defaultValue={employee.authorized}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="flex justify-center space-x-4">
        <button 
          onClick={onBack}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Back to List
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Update
        </button>
        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UpdateEmployee;