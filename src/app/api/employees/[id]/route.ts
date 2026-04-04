import { NextResponse } from "next/server";
import axios from "axios";

const TOKEN = process.env.WP_JWT_TOKEN!;

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 

    const url = `http://localhost/wordpress/wp-json/wp/v2/employee/${id}?force=true`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log("DELETE ERROR:", error.response?.data);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const url = `http://localhost/wordpress/wp-json/wp/v2/employee/${id}`;

    const res = await axios.post(
      url,
      {
        title: body.name,
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

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.log("UPDATE ERROR:", error.response?.data);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}