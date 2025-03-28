import React from "react";
import { RemoveBtn } from ".";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
      next: { revalidate: 10 },  
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error during loading topics ", error);
    return { topics: [] }; // ✅ Default value return करो
  }
};


const TopicsList = async () => {
  const { topics } = await getTopics();

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };


  return (
    <>
      {topics?.map((t) => (
        <div
          key={t._id}
          className="p-4 border rounded border-slate-400 my-3 flex justify-between gap-5 items-start"
        >
          <div className="">
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div className="">{t.description}</div>
          </div>

          <div className="items-end flex flex-col space-y-5">
            <div className="flex gap-2">
              <RemoveBtn key={t._id} id={t._id} />
              <Link href={`/editTopic/${t?._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
            <p className="text-xs">Updated At : <span className="font-bold">{formatDate(t.updatedAt)}</span></p>
          </div>
        </div>
      ))}
    </>
  );
};

export default TopicsList;
