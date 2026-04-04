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
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import type { Employee, FormData } from "@/typescript/types";
import { useCreateEmployee } from "@/service/useEmployee";
import { useUpdateEmployee } from "@/service/useEmployee";

export type TaskFormProps = {
  open: boolean;
  onClose: (open: boolean) => void;
  initialData?: Employee | null;
};

const EmployeeAddForm = ({ open, onClose, initialData }: TaskFormProps) => {
  const [salary, setSalary] = useState<number>(10000);
  const [empId, setEmpId] = useState("");

  // const empId = uuidv4().replace(/-/g, "").substring(0, 7).toUpperCase();

  const generateId = () => {
    return uuidv4().replace(/-/g, "").substring(0, 7).toUpperCase();
  };

  const departments = [
    "REACT",
    "NODE",
    "DJANGO",
    "SQL",
    "PHP",
    "LARAVEL",
    "CMS",
  ];

  const {
    register,
    reset,
    handleSubmit,
    setValue, // ✅ from RHF
    formState: { errors },
  } = useForm<FormData>();

  const mutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();

  //  set code once
  useEffect(() => {
    if (open) {
      const newId = generateId();
      setEmpId(newId);
      setValue("code", empId);
    }
  }, [open, setValue]);

  useEffect(() => {
    register("code");
  }, [register]);

  // register department manually

  useEffect(() => {
    register("department", { required: true });
  }, [register]);

 const onSubmit = (data: FormData) => {
  if (initialData) {
    updateMutation.mutate(
      { id: initialData.id, data },
      {
        onSuccess: () => {
          reset();
          onClose(false); 
        },
      }
    );
  } else {
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose(false); 
      },
    });
  }
};

  useEffect(() => {
    if (initialData) {
      // EDIT mode
      setValue("name", initialData.name);
      setValue("email", initialData.email);
      setValue("code", initialData.code);
      setValue("salary", initialData.salary);
      setValue("department", initialData.department);
      setValue("location", initialData.location);

      setSalary(initialData.salary);
    } else {
      // ADD mode → reset everything
      reset();

      const newId = generateId();
      setEmpId(newId);
      setValue("code", newId);
      setSalary(10000);
    }
  }, [initialData, reset, setValue]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogDescription>
            Add Employee to Wordpress database
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <Field>
            <FieldLabel>Name</FieldLabel>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Enter Name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </Field>

          {/* EMAIL */}
          <Field className="mt-2">
            <FieldLabel>Email</FieldLabel>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </Field>

          {/* CODE */}
          <Field className="mt-2">
            <FieldLabel>Employee Code</FieldLabel>
            <Input value={empId} readOnly type="text" />
          </Field>

          {/* SALARY */}
          <Field className="mt-2">
            <FieldLabel>Salary</FieldLabel>
            <Input
              type="range"
              value={salary}
              min={10000}
              max={50000}
              onChange={(e) => {
                const val = e.target.valueAsNumber;
                setSalary(val);
                setValue("salary", val);
              }}
            />
            <FieldDescription>₹{salary}</FieldDescription>
          </Field>

          {/* DEPARTMENT */}
          <Field className="mt-2">
            <FieldLabel>Department</FieldLabel>
            <Select
              value={initialData?.department}
              onValueChange={(val) => setValue("department", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {departments.map((dep) => (
                    <SelectItem value={dep} key={dep}>
                      {dep}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.department && (
              <p className="text-red-500">Department is required</p>
            )}
          </Field>

          {/* LOCATION */}
          <Field className="mt-3">
            <FieldLabel>Location</FieldLabel>
            <Input
              {...register("location", { required: "Location is required" })}
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}
          </Field>

          {/* BUTTONS */}
          <Field orientation="horizontal" className="mt-3">
            <Button
            disabled={!!initialData}
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                const newId = generateId();
                setEmpId(newId);
                setValue("code", empId);
              }}
            >
              Reset
            </Button>

            <Button type="submit">
              {initialData
                ? updateMutation.isPending
                  ? "Updating..."
                  : "Update"
                : mutation.isPending
                  ? "Creating..."
                  : "Create"}
            </Button>
          </Field>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeAddForm;
