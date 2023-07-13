import { connect } from "@/dbconfig/dbConfig";
import todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, description } = reqBody;
    console.log(title)
    const newTodo = new todo({
      title,
      description
    });
    const result = await newTodo.save();
    console.log(result);
    return NextResponse.json({ message: "Todo created successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
