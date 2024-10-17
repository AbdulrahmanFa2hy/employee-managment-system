import React from 'react';
import { Employee } from '@/types/Employee';
import Image from 'next/image';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Employee List</h2>
      <ul className="space-y-4">
        {employees.map((employee) => (
          <li key={employee.id} className="bg-white shadow rounded-lg p-4 flex items-center">
            <div className="flex-shrink-0 h-16 w-16 mr-4">
              <Image
                src={employee.photo}
                alt={`${employee.name}'s photo`}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium">{employee.name}</h3>
              <p className="text-sm text-gray-500">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
              <p className="text-sm text-gray-500">{employee.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;