import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Employee } from "@/typescript/types";
import { Button } from "./ui/button";
import { useDeleteEmployee } from "@/service/useEmployee";

type Props = {
  emp: Employee;
  onEdit: (emp: Employee) => void;
};

const Empcard = ({ emp,onEdit }: Props) => {
  const mutation = useDeleteEmployee();

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all mb-2">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{emp.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{emp.email}</p>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Code:</span> {emp.code}
        </p>
        <p>
          <span className="font-medium">Department:</span> {emp.department}
        </p>
        <p>
          <span className="font-medium">Location:</span> {emp.location}
        </p>
        <p className="font-semibold text-green-600">₹{emp.salary}</p>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(emp)}>Edit</Button>
        <Button
          variant="destructive"
          className="bg-red-600 text-white"
          onClick={() => mutation.mutate(emp.id)}
          // disabled={mutation.isPending}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Empcard;
