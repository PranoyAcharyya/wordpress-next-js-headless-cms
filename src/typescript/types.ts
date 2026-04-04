export type FormData = {
  name: string;
  email: string;
  code: string;
  salary: number;
  department: string;
  location: string;
};

export type Employee = {
  id: number;
  name: string;
  email: string;
  code: string;
  salary: number;
  department: string;
  location: string;
  image: string | null;
};