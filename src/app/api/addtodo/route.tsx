import { connect } from "@/dbconfig/dbConfig";
import todo from "@/models/todoModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { title, description } = reqBody;
    const newTodo = new todo({
      title,
      description
    });
    const result = await newTodo.save();
    return NextResponse.json({ message: "Todo created successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
