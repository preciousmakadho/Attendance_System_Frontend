import React, { useState } from 'react';
import UpdateEmployee from './UpdateEmployee';

const EmployeeDetails = ({ employee, onBack }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (isUpdating) {
    return <UpdateEmployee employee={employee} onBack={() => setIsUpdating(false)} />;
  }

  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Authorize Employee</h2>
      <div className="mb-4">
        <strong>Name:</strong> {employee.name}
      </div>
      <div className="mb-4">
        <strong>Email:</strong> {employee.email}
      </div>
      <div className="mb-4">
        <strong>Phone Number:</strong> {employee.phone}
      </div>
      <div className="mb-4">
        <strong>Designation:</strong> {employee.designation}
      </div>
      <div className="mb-4">
        <strong>Department:</strong> {employee.department}
      </div>
      <div className="mb-4">
        <strong>Authorized:</strong> {employee.authorized}
      </div>
      <div className="flex items-center mb-4">
        <input type="checkbox" id="authorize" />
        <label htmlFor="authorize" className="ml-2">Authorize Employee</label>
      </div>
      <div className="flex space-x-4">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsUpdating(true)}
        >
          Update Authorization
        </button>
        <button 
          className="bg-gray-300 px-4 py-2 rounded" 
          onClick={onBack}
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetails;