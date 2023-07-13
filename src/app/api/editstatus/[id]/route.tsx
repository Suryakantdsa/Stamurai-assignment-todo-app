
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import todo from "@/models/todoModel";

connect();



export async function PUT(request: NextRequest,  { params }: { params: { id: string } }) {
    const { id } = params;
    await connect();
  
    try {
      const reqBody = await request.json();
      
      const res = await todo.findByIdAndUpdate({ _id: id },reqBody);
      if (!res) {
        return NextResponse.json({ error: 'update task failed' }, { status: 404 });
      }
  
      return NextResponse.json({ res }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  