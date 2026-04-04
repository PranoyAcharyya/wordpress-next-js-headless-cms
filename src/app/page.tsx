"use client";
import EmployeeAddForm from "@/components/EmployeeAddForm";
import { Button } from "@/components/ui/button";
import { useEmpQuery } from "@/service/useEmployee";
import Image from "next/image";
import { useState } from "react";
import type { Employee } from "@/typescript/types";
import Empcard from "@/components/Empcard";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error ,isFetching} = useEmpQuery();
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Button
          onClick={() => {
            setSelectedEmp(null); 
            setOpen(true);
          }}
        >
          Add Emplpoyee
        </Button>
      </div>
      <EmployeeAddForm open={open} onClose={setOpen} initialData={selectedEmp}/>
      {isLoading && (
  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
    Loading
  </p>
)}
     
      {data?.length === 0 && <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">No Data yet</p>}
      <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  mx-auto px-4">
        {data?.map((emp: Employee) => (
          <Empcard
            emp={emp}
            key={emp.id}
            onEdit={(emp) => {
              setSelectedEmp(emp);
              setOpen(true);
            }}
          />
        ))}
      </div>
    </>
  );
}
