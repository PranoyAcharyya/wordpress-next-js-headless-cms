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
import { Binary, BriefcaseBusiness, MapPin, ReceiptIndianRupee } from "lucide-react";
import { toast } from "sonner";

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

      <CardContent className="space-y-3 text-sm">
        <div className="flex gap-2">
          <Binary className="size-5"/> Employee Code: {emp.code}
        </div>
        <div className="flex gap-2">
          <BriefcaseBusiness className="size-5"/> Department: {emp.department}
        </div>
        <div className="flex gap-2">
         <MapPin className="size-5"/> Location: {emp.location}
        </div>
        <div className="font-semibold text-green-600 flex gap-2">
          <ReceiptIndianRupee className="size-5"/> ₹{emp.salary} per month
          </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => onEdit(emp)}>Edit</Button>
        <Button
          variant="destructive"
          className="bg-red-600 text-white"
          onClick={() =>{ mutation.mutate(emp.id) , toast.warning('Data has been deleted')}}
          // disabled={mutation.isPending}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Empcard;
