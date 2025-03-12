import conectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const prm = await params;

    const { newTitle, newDescription } =await request.json();
    await conectMongoDB();

    await Topic.findByIdAndUpdate(prm?.id, {
      title: newTitle,
      description: newDescription,
    });

    return NextResponse.json({
      message: "Topic updated",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Topic not updated",
      status: 200,
      error: error,
    });
  }
}


export async function GET(request, { params }) {
    try {
      const prm = await params;
  
      await conectMongoDB();
  
     const topic =  await Topic.findById({_id:prm?.id});
  
      return NextResponse.json({
        message: "Topic found",
        status: 200,
        topic
      });
    } catch (error) {
      return NextResponse.json({
        message: "Topic not found",
        status: 200,
        error: error,
      });
    }
  }