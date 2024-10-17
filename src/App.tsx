import React, { useState } from 'react';
import { Employee } from './types/Employee';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import { Users } from 'lucide-react';

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleAddEmployee = (newEmployee: Omit<Employee, 'id'>) => {
    const employee: Employee = {
      ...newEmployee,
      id: employees.length + 1,
    };
    setEmployees([...employees, employee]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <Users className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">Employee Management System</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your company's workforce efficiently</p>
        </div>
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
          <EmployeeForm onAddEmployee={handleAddEmployee} />
        </div>
        <EmployeeList employees={employees} />
      </div>
    </div>
  );
}

export default App;