
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import todo from "@/models/todoModel";
import Cors from "cors";

const cors = Cors({
  origin: 'https://stamurai-assignment-todo-app-tc22.vercel.app',
});



export async function GET(request: NextRequest,  { params }: { params: { id: string } }) {
  const { id } = params;
  await connect();
  try {
    const task = await todo.findOne({ _id: id });
    console.log(task)
    if (!task) {
      return NextResponse.json({ error: 'task not found' }, { status: 404 });
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
export async function PUT(request: NextRequest, response:NextResponse ,next: NextResponse,{ params }: { params: { id: string } }) {
  const { id } = params;
  await connect();
 
  try {
    const reqBody = await request.json();
    const { title, description } = reqBody;
    const res = await todo.findByIdAndUpdate({ _id: id },{title,description});
    if (!res) {
      return NextResponse.json({ error: 'update task failed' }, { status: 404 });
    }

    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
