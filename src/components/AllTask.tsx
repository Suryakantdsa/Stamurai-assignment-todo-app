"use client";
import React from "react";
import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import Link from "next/link";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isInprogress: boolean;
  isTodo: boolean;
}

const AllTask = (props: Task) => {
  const { title, description, isCompleted, isInprogress, isTodo, id } = props;
  type status= String
  type bgCol= String
  let status,bgCol;
  if(isCompleted){
    status="Completed";
    bgCol="rgb(34 197 94)"
  }
  else if(isInprogress){
    status="In progress"
    bgCol=" rgb(234 179 8 )"
  }
  else{
      status="Yet to Complete"
      bgCol="rgb(239 68 68)"
  }

  return (
    <div className="min-w-[600px] mx-auto border shadow rounded-md border-orange-400 p-2 m-4">
      <div className="flex w-full justify-between border p-2  ">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="w-[12%] flex justify-between items-center px-2">
          <EditBtn id={id} />
          <DeleteBtn id={id} />
        </div>
      </div>
      <section className="min-h-[100px] mt-2  p-2">{description}</section>
      <div className="flex text-lg border p-2 justify-between my-auto">
        <div className="flex">
          <h3 className="font-bold mr-3">status :</h3>
          <span style={{backgroundColor:`${bgCol}`}} className=" text-white text-sm my-auto py-1 px-2 rounded">
         {status}
          </span>
        </div>
        <Link href={`/editstatus/${id}`}>
        <button className="bg-yellow-300 text-black font-bold px-2 py-1  rounded">
          change status
        </button>
        </Link>
      </div>
    </div>
  );
};

export default AllTask;
