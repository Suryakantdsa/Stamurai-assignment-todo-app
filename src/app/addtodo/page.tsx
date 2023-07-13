"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast , Toaster } from 'react-hot-toast';
useRouter
// import 'react-hot-toast/dist/index.css';


const AddToDo = () => {
  const [todos,setTodo] = useState({
    title: "" ,
    description:"",
  });
  const router=useRouter()

  const handleAddTodo =async() => {
    console.log("Title:", todos.title);
    console.log("Description:",todos.description );
    // const {title,description}=todos
    try {
      const response =await axios.post("/api/addtodo",todos)
      // if(response){
        toast.success('Task added successfully');
        setTimeout(() => {
          
          router.push("/")
        }, 2000);
        console.log("added suscess",response)
      // }

    }  catch (error: any) {
      console.log("Something went wrong:", error);
    
    }
    
    setTodo({
      title:'',
      description:""
    })
  };
  return (
    <div className="flex justify-center">
      <div className="p-4">
        <h2 className="text-2xl mb-4">Add new Task</h2>
        <label htmlFor="title" className="block mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={todos.title}
          onChange={(e)=>{setTodo({...todos,title:e.target.value})}}
          placeholder="enter the title"
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />

        <label htmlFor="description" className="block mb-2">
          Description:
        </label>
        <textarea
          id="description"
          value={todos.description}
          onChange={(e)=>{setTodo({...todos , description:e.target.value})}}
          className="w-full border border-gray-300 rounded-md py-2 px-3 h-40 resize-none mb-4"
          placeholder="Write description..."
        />

        <button
          onClick={handleAddTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
        <Toaster  position="top-right"
           toastOptions={
            {
            // Define default options
            className: '',
            duration: 2000,
            style: {
              background: 'green',
              color: '#fff',
            }
          }
          }
        />
    </div>
  );
};

export default AddToDo;
