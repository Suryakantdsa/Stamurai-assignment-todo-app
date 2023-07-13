"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ChangeStatus = ({ params }: any) => {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const closePopup = () => {
    router.push("/");
  };

  const handleStatusChange = async (status: string) => {
    let payload;
    if (status === "Completed") {
      payload = { isCompleted: true, isInprogress: false, isTodo: false };
    } else if (status === "inProgress") {
      payload = { isInprogress: true, isTodo: false, isCompleted: false };
    } else {
      payload = { isTodo: true, isCompleted: false, isInprogress: false };
    }
    console.log("Selected status:", status);
    try {
      const response = await axios.put(`/api/editstatus/${params.id}`, payload);
      toast.success("Status Changed successfully");
      router.push("/");
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  return (
    <div>
      {
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded p-4 shadow-lg">
            {isLoading && (
              <h1 className="text-center text-lg ">Processing ......</h1>
            )}
            <h3 className="text-lg font-bold mb-4">Change Status</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => handleStatusChange("Completed")}
                className="flex items-center justify-center bg-green-500 text-white font-bold py-2 px-4 rounded"
              >
                Completed
              </button>
              <button
                onClick={() => handleStatusChange("inProgress")}
                className="flex items-center justify-center bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              >
                In Progress
              </button>
              <button
                onClick={() => handleStatusChange("yetToto")}
                className="flex items-center justify-center bg-red-500 text-white font-bold py-2 px-4 rounded"
              >
                Yet to do
              </button>
            </div>
            <button
              onClick={closePopup}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default ChangeStatus;
