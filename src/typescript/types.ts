// Base type (shared fields)
export type EmployeeBase = {
  name: string;
  email: string;
  code: string;
  salary: number;
  department: string;
  location: string;
};

// Form input type (no extra fields)
export type FormData = EmployeeBase;

// Full employee (extends base)
export type Employee = EmployeeBase & {
  id: number;
  image: string | null;
};