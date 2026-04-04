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
  const { data, isLoading, error } = useEmpQuery();
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
      {isLoading && <p>Loding</p>}
      {data?.length === 0 && <p>No Data yet</p>}
      <div className="container grid grid-cols-4 gap-6  mx-auto px-4">
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
