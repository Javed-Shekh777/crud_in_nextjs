import { EditTopicForm } from "@/components";

const getTopicByID = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Error loading topic : ");
    }

    return res.json();
  } catch (error) {
    console.log(`Error loading Topic ${error}`);
  }
};

const EditTopic = async ({ params }) => {
  const { id } = await params;
  const { topic } = await getTopicByID(id);
  const {title,description}= topic;

  return <EditTopicForm title={title} description={description}  id={id} />;
};

export default EditTopic;
