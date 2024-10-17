import React, { useState, useEffect } from 'react';
import { Employee } from '@/types/Employee';
import EmployeeForm from '@/components/EmployeeForm';
import EmployeeList from '@/components/EmployeeList';
import { Users, Search } from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetchEmployees();
    }
  }, [session]);

  const fetchEmployees = async () => {
    const response = await fetch('/api/employees');
    const data = await response.json();
    setEmployees(data);
  };

  const handleAddEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    });
    if (response.ok) {
      const addedEmployee = await response.json();
      setEmployees([...employees, addedEmployee]);
    } else {
      const error = await response.json();
      alert(error.message);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button
          onClick={() => signIn()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <Users className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">Employee Management System</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your company's workforce efficiently</p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p>Welcome, {session.user?.name} ({session.user?.role})</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign out
          </button>
        </div>
        <div className="mt-8 bg-white shadow rounded-lg p-6">
          <div className="mb-4">
            <label htmlFor="search" className="sr-only">Search employees</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search employees"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {session.user?.role === 'Admin' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
              <EmployeeForm onAddEmployee={handleAddEmployee} existingEmails={employees.map(e => e.email)} />
            </>
          )}
        </div>
        <EmployeeList employees={filteredEmployees} />
      </div>
    </div>
  );
}