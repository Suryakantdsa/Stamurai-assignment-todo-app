import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";

import axios from "axios";
import { toast, Toaster } from "react-hot-toast";


interface DeleteBtnProps {
  id: string;
}

const DeleteBtn = ({ id }:DeleteBtnProps) => {
  const router = useRouter();

  const deleteOneById = async () => {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (confirmed) {
      try {
        const res=await axios.delete(`api/todos?id=${id}`);
        toast.success("Task deleted successfully", {
          position: "top-left",
          duration: 2000,
        });
      
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <button onClick={deleteOneById}>
      <MdDelete size={24} color="red" />
      <Toaster
           toastOptions={
            {
            style: {
              background: 'orange',
              color: '#fff',
            },
            duration: 2000
          }
          }
        />
    </button>
  );
};

export default DeleteBtn;
