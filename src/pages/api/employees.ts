import type { NextApiRequest, NextApiResponse } from 'next'
import { Employee } from '@/types/Employee'

let employees: Employee[] = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Employee | Employee[] | { message: string }>
) {
  if (req.method === 'GET') {
    res.status(200).json(employees)
  } else if (req.method === 'POST') {
    const { email } = req.body;
    if (employees.some(employee => employee.email === email)) {
      res.status(400).json({ message: 'An employee with this email already exists.' })
    } else {
      const newEmployee: Employee = {
        id: employees.length + 1,
        ...req.body
      }
      employees.push(newEmployee)
      res.status(201).json(newEmployee)
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}