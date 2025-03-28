import { EditTopicForm } from "@/components";

const getTopicByID = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/topics`, {
      next: { revalidate: 10 }, // Fix for Static Export Issue
    });
    if (!res.ok) {
      throw new Error("Error loading topics");
    }
    return res.json();

    
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
