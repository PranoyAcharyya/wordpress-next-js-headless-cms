import { GET } from "@/app/api/employees/route"
import { useQuery } from "@tanstack/react-query"


const fetchEmployees = async () => {
  const res = await fetch("/api/employees");
  
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

export const useEmpQuery = () =>{
    return useQuery({
        queryKey:['Employees'],
        queryFn:fetchEmployees,
    })
}