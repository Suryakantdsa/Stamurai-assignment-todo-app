"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
// import 'react-hot-toast/dist/index.css';

interface Task {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isInprogress: boolean;
  isTodo: boolean;
  _id: string;
}

const UpdateTask = ({ params }: any) => {
  const [todos, setTodo] = useState({
    title: "",
    description: "",
  });
  useEffect(() => {
    getOldData();
  }, []);

  const router = useRouter();

  const getOldData = async () => {
    try {
      const response = await axios.get(
        `https://stamurai-assignment-todo-app.vercel.app/api/edittask/${params.id}`
      );
      if (response.data && response.data.task) {
        const task = response.data.task;
        setTodo({
          title: task.title,
          description: task.description,
        });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/edittask/${params.id}`,
        todos
      );
      toast.success("Task updated successfully");
      router.push("/");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <h2 className="text-2xl mb-4">Update new Task</h2>
        <label htmlFor="title" className="block mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={todos.title}
          onChange={(e) => {
            setTodo({ ...todos, title: e.target.value });
          }}
          placeholder="enter the new title to update "
          className="w-full border border-gray-300 rounded-md py-2 px-3 mb-4"
        />

        <label htmlFor="description" className="block mb-2">
          Description:
        </label>
        <textarea
          id="description"
          value={todos.description}
          onChange={(e) => {
            setTodo({ ...todos, description: e.target.value });
          }}
          className="w-full border border-gray-300 rounded-md py-2 px-3 h-40 resize-none mb-4"
          placeholder="Write updated description..."
        />

        <button
          onClick={handleUpdateTodo}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          duration: 2000,
          style: {
            background: "blue",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default UpdateTask;
