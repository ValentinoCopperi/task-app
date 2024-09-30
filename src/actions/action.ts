'use server';

import { getModel } from "@/app/api/tasks/[taskId]/route"
import { Posts, User, UserData } from "@/types";
import { ObjectId } from 'mongodb';
import { revalidatePath } from "next/cache";


interface CreateTaskDto {
  title: string;
  description: string;
  categories: any
}

function serializeMongoObject(obj: any): any {
  const newObj: any = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof ObjectId) {
      newObj[key] = value.toHexString();
    } else if (value instanceof Date) {
      newObj[key] = value.toISOString();
    } else if (Array.isArray(value)) {
      newObj[key] = value.map(serializeMongoObject);
    } else if (typeof value === 'object' && value !== null) {
      newObj[key] = serializeMongoObject(value);
    } else {
      newObj[key] = value;
    }
  }

  return newObj;
}

export const handleStatus = async (id: string, status: string): Promise<any> => {
  console.log(status)

  try {

    const model = await getModel('tasks');

    const taskId = new ObjectId(id);


    const result = await model.findOneAndUpdate(
      { _id: taskId },
      { $set: { status: status } },
      { returnDocument: 'after' } // This option returns the updated document
    );

    if (!result) {
      throw new Error('Task not found');
    }

    revalidatePath('/')

    return serializeMongoObject(result);


  } catch (error) {

    console.log(error)
    throw error;

  }





}

export const createTodo = async (createTaskDto: CreateTaskDto): Promise<any> => {

  try {

    const model = await getModel('tasks');

    const newTask = await model.insertOne({
        ...createTaskDto,
        likes: [],
        comment: [],
        status: 'pending',
        isDone: false,
        user: {
            _id: "66e76b1c3f93a500a0a40b7d",
            username: "pepon123"
        },
       createdAt : "2024-09-16T00:32:42.895+00:00"
    })


    revalidatePath('/')
    return newTask;

  } catch (error) {
    console.log(error)
    throw error;
  }

}

export const handleDelete = async (id: string) => {

  try {

    const model = await getModel('tasks');

    const _id = new ObjectId(id);

    await model.deleteOne({ _id })

    revalidatePath('/')


  } catch (error) {

    console.log(error)
    throw error;

  }

}


