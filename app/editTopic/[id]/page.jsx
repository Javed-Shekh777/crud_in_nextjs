import { EditTopicForm } from "@/components";

const getTopicByID = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error loading topic");
    }

    return await res.json();
  } catch (error) {
    console.log(`Error loading Topic: ${error}`);
    return { topic: { title: "", description: "" } }; // Default empty object
  }
};

const EditTopic = async ({ params }) => {
  const { id } = params;
  const data = await getTopicByID(id);

  if (!data || !data.topic) {
    return <div>Error: Topic not found</div>;
  }

  const { title, description } = data.topic;

  return <EditTopicForm title={title} description={description} id={id} />;
};

export default EditTopic;
