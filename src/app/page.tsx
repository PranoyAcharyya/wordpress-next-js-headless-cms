"use client";
import EmployeeAddForm from "@/components/EmployeeAddForm";
import { Button } from "@/components/ui/button";
import { useEmpQuery } from "@/service/useEmployee";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useEmpQuery();

  return (
    <>
      <div className="container mx-auto px-4 py-4">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Emplpoyee
        </Button>
      </div>
      <EmployeeAddForm open={open} onClose={setOpen} />
         {isLoading && <p>Loding</p>}
      <div className="container-xl mx-auto grid grid-cols-1 gap-6">
      {data?.map((emp) => (
        <div
          key={emp.id}
          className="rounded-2xl shadow-md p-4 border bg-white w-full"
        >
          {emp.image && (
            <img
              src={emp.image}
              alt={emp.name}
              className="w-full h-40 object-cover rounded-xl mb-3"
            />
          )}

          <h2 className="text-lg font-semibold">{emp.name}</h2>
          <p className="text-sm text-gray-500">{emp.email}</p>

          <div className="mt-2 text-sm">
            <p>💼 {emp.department}</p>
            <p>📍 {emp.location}</p>
            <p className="font-medium">₹{emp.salary}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
