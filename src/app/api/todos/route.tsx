
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbConfig";
import todo from "@/models/todoModel";

connect();

export async function GET(request:NextRequest){
  try {
      const todos = await todo.find()
      // console.log(todos) 
      return NextResponse.json(
         todos
      )
  } catch (error:any) {
      return NextResponse.json({error: error.message}, {status: 400});
  }

}


export async function DELETE(request:NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  await connect();
  try {
    const res=await todo.findByIdAndDelete(id);
    return NextResponse.json(res)
    
  } catch (error) {
    return NextResponse.json({ message: "task failed to delete" }, {status: 400});
  }
 
}


