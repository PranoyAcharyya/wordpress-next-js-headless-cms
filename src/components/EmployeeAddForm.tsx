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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "./ui/button";

export type TaskFormProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  //   mode: "add" | "edit";
  //   initialData?: any;
};

const EmployeeAddForm = ({ open, onClose }: TaskFormProps) => {
  const [salary, setSalary] = useState<number>(10000);

  const empId = uuidv4().replace(/-/g, "").substring(0, 7).toUpperCase();

  const depatments = ["REACT","NODE","DJANGO","SQL","PHP","LARAVEL","CMS"];

  

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
              <FieldLabel htmlFor="empname">Add Employee name</FieldLabel>
              <Input type="text" placeholder="Enter Name" />
            </Field>
            <Field className="mt-2">
              <FieldLabel htmlFor="empemail">Employee Email</FieldLabel>
              <Input type="Email" placeholder="Enter email" />
            </Field>
            <Field className="mt-2">
              <FieldLabel htmlFor="empid">Employee Code</FieldLabel>
              <Input value={empId} type="number" readOnly placeholder={empId} />
            </Field>
            <Field className="mt-2">
              <FieldLabel htmlFor="salary">Employee Salary</FieldLabel>

              <Input
                type="range"
                value={salary}
                min={10000}
                max={50000}
                placeholder="Enter salary"
                onChange={(e) => setSalary(e.target.valueAsNumber)}
              />
              <FieldDescription>₹{salary}/ per month</FieldDescription>
            </Field>
            <Field className="mt-2">
              <FieldLabel htmlFor="empdpt">Employee Department</FieldLabel>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Deparment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {depatments.map((dep,index)=>(
                      <SelectItem value={dep} key={index}>{dep}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field className="mt-3">
              <FieldLabel htmlFor="emplocation">Add Employee location</FieldLabel>
              <Input type="text" placeholder="Enter location" />
            </Field>
            <Field orientation="horizontal" className="mt-3">
          <Button type="button" variant="outline" >
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
          </Field>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeAddForm;
