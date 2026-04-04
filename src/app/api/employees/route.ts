import { NextResponse } from "next/server";
import axios from "axios";

const WP_URL = process.env.WP_API_URL!;
const TOKEN = process.env.WP_JWT_TOKEN!;



export async function GET() {
  const res = await fetch(WP_URL, { cache: "no-store" });
  const data = await res.json();

  const employees = data.map((emp: any) => ({
    id: emp.id,
    name: emp.title.rendered,
    email: emp.acf.emp_email,
    code: emp.acf.employee_code,
    salary: emp.acf.employees_salary,
    department: emp.acf.employee_department,
    location: emp.acf.location,
    image:
    emp._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
  }));

  return NextResponse.json(employees);
}


//  CREATE EMPLOYEE
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await axios.post(
      WP_URL,
      {
        title: body.name,
        status: "publish",
        acf: {
          emp_email: body.email,
          employee_code: body.code,
          employees_salary: body.salary,
          employee_department: body.department,
          location: body.location,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    // console.log("BODY:", body);
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log(error.response?.data);
    return NextResponse.json(
      { error: "Failed to create employee" },
      { status: 500 }
    );
  }
}

