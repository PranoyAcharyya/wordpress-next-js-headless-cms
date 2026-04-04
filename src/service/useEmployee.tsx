
import { useQuery } from "@tanstack/react-query"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { FormData } from "@/typescript/types";




// fetch employees
const fetchEmployees = async () => {
  const res = await fetch("/api/employees");
  
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
};

//create employee

const createEmployee = async (data: FormData) => {
  const res = await axios.post("/api/employees", data);
  return res.data;
};

//delete employee

const deleteEmployee = async(id:number)=>{
  const res = await axios.delete(`/api/employees/${id}`);
  return res.data;
}


//update employee

const updateEmployee = async ({
  id,
  data,
}: {
  id: number;
  data: FormData;
}) => {
  const res = await axios.post(`/api/employees/${id}`, data);
  return res.data;
};


// //////////////////////////////////////////////////////////////////////////////////



// custom query hook to fetch employees
export const useEmpQuery = () =>{
    return useQuery({
        queryKey:['employees'],
        queryFn:fetchEmployees,
    })
}


//custom query hook to create employee

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: async() => {
      await queryClient.refetchQueries({ queryKey: ["employees"] });
    },
  });
};


//custom query hook to delete employee

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["employees"] });
    },
  });
};

//custom query hook to update employee

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["employees"] });
    },
  });
};