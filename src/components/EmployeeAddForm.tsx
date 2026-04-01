"use client";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

export type TaskFormProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  //   mode: "add" | "edit";
  //   initialData?: any;
};



const EmployeeAddForm = ({ open, onClose }: TaskFormProps) => {

    const empId = uuidv4().replace(/-/g, "").substring(0, 7).toUpperCase();
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Employee</DialogTitle>
            <DialogDescription>
              Add Employee to Wordpress database
            </DialogDescription>
          </DialogHeader>
          <form>
            <Field>
              <FieldLabel htmlFor="input-demo-api-key">Add Employee name</FieldLabel>
              <Input
                type="text"
                placeholder="Enter Name"
              />
              
            </Field>
            <Field className="mt-2">
              <FieldLabel htmlFor="input-demo-api-key">Employee Code</FieldLabel>
              <Input
                value={empId}
                type="number"
                readOnly
                placeholder={empId}
              />
              
            </Field>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeAddForm;
