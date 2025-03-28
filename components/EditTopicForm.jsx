"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditTopicForm = ({ title, id, description }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/topics/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newTitle, newDescription }),
        }
      );

      if (!res.ok) {
        throw new Error("Error while updating Topic");
      }

      router.push("/");
    } catch (error) {
      console.log(`Error while updating topic: ${error}`);
    }
  };

  return (
    <form onSubmit={onHandleSubmit} className="flex flex-col gap-5">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        name="title"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Title"
      />
      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        name="description"
        className="border border-slate-500 px-8 py-2"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-600 cursor-pointer rounded font-bold text-white py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  );
};

export default EditTopicForm;
