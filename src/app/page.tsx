"use client"
import EmployeeAddForm from "@/components/EmployeeAddForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
   const [open, setOpen] = useState(false);

  return (
    <>
    <div className="container mx-auto px-4 py-4">
       <Button onClick={()=>{
        setOpen(true);
       }}>Add Emplpoyee</Button>
    </div>
     <EmployeeAddForm open={open}
        onClose={setOpen}
/>

    </>
  );
}
