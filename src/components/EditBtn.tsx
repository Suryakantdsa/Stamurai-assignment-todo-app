"use client";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface idProps {
  id: string;
}
const EditBtn = ({id}: idProps )=> {
  const router = useRouter();

  return (
    <Link href={`/edittask/${id}`}>
  
      <BiEdit size={24} color="blue" />
   
    </Link> 
  );
};

export default EditBtn;
