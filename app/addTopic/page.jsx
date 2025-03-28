"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    let error = {};
    if (!title) {
      error.title = "Title is required";
    }
    if (!description) {
      error.description = "Description is required";
    }

    if (Object.values(error).length > 0) {
      setErrors(error);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!res.ok) {
        throw new Error(`Topic not added`);
      }

      router.push("/");
      alert("Topic Added");
    } catch (error) {
      console.log(`Error occured while adding topic : ${error}`);
    }
  };

  return (
    <form onSubmit={onHandleSubmit} className="flex flex-col gap-5">
      <div className="w-full">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full border-slate-500 px-8 py-2"
          placeholder="Topic Title"
        />
        {errors.title && <p className="text-red-400">{errors.title}</p>}
      </div>

      <div className="w-full">
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border w-full border-slate-500 px-8 py-2"
          placeholder="Topic Description"
        />
        {errors.description && (
          <p className="text-red-400">{errors.description}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-green-600 cursor-pointer rounded font-bold text-white py-3 px-6 w-fit"
      >
        Add Topic
      </button>
    </form>
  );
};

export default page;
