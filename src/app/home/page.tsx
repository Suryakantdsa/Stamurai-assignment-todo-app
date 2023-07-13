"use client";
import React from "react";
import AllTask from "@/components/AllTask";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isInprogress: boolean;
  isTodo: boolean;
  _id: string;
}

const Todos = () => {
  const [allTask, setAllTask] = useState<Task[]>([]);
  const [allTaskfilter, setAllTaskfilter] = useState<Task[]>([]);
  useEffect(() => {
    getAllTask();
  }, []);

  useEffect(()=>{

  },[allTaskfilter])

  const filterALL=()=>{
    setAllTaskfilter(allTask)
  }

  const filterComplete=()=>{
    setAllTaskfilter([])
    const data =allTask.filter(x=>x.isCompleted)
    setAllTaskfilter(data)
  }
  const filterInprogress=()=>{
    setAllTaskfilter([])
    const data =allTask.filter(x=>x.isInprogress)
    setAllTaskfilter(data)
  }
  const filterYetTodo=()=>{
    setAllTaskfilter([])
    const data =allTask.filter(x=>x.isTodo)
    setAllTaskfilter(data)
    console.log(data)
  }

  const getAllTask = async () => {
    try {
      const response = await axios.get<Task[]>("/api/todos");
      setAllTask(response.data);
      setAllTaskfilter(response.data)
      console.log("Tasks fetched successfully:");
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-10 ">
      <h1 className="font-bold text-center text-2xl min-w-[600px] mx-auto underline md:text-3xl">
        Task Management Application
      </h1>
      <div className="flex h-5 mx-auto bg-cyan-100 justify-around p-2 m-1 min-w-[600px] text-xl border-2 min-h-[5rem] mt-5">
        <div className="h-6 text-sm px-3 py-1 my-auto bg-gray-200 rounded-md   ">
          <button className="h-full  font-bold " onClick={()=>{filterALL()}}>All</button>
        </div>
        <div className="h-6 text-sm px-3 py-1 my-auto bg-red-200 rounded-md  ">
          <button className="h-full  font-bold" onClick={()=>{filterYetTodo()}}>Todo</button>
        </div>
        <div className="h-6 text-sm px-3 py-1 my-auto bg-orange-200 rounded-md ">
          <button className="h-full  font-bold" onClick={()=>{filterInprogress()}}>In progress</button>
        </div>
        <div className="h-6 text-sm px-3 py-1 my-auto bg-green-400 rounded-md  ">
          <button className="h-full  font-bold" onClick={()=>{filterComplete()}}>Completed</button>
        </div>
        <div className="bg-green-700 rounded-lg h-12 my-auto p-1">
          <Link href={"/addtodo"}>
            <button className="border px-2 h-full p-1 rounded-md text-white font-bold">
              ADD TASK
            </button>
          </Link>
        </div>
      </div>

      {
      allTaskfilter.length>0
      ?
      allTaskfilter.map((data: Task) => {
        const { _id, title, description, isCompleted, isInprogress, isTodo } =
          data;
        const id = String(_id);
        return (
          <AllTask
            key={_id}
            id={id}
            title={title}
            description={description}
            isCompleted={isCompleted}
            isInprogress={isInprogress}
            isTodo={isTodo}
          />
        );
      })
    :
    <div className="mt-10 flex justify-center p-10 bg-red-400 text-white shadow border min-w-[600px] text-lg font-bold">No task is Found in database   ?</div>
    }
      
    </main>
  );
};

export default Todos;
