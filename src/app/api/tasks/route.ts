import dbConnect from '@/libs/mongo/mongo';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import * as Yup from 'yup'




async function getModel(modelName: string) {

    if (!modelName) {
        throw new Error('Tasks collection not found');
    }

    await dbConnect();
    const model = mongoose.connection.db?.collection(modelName);

    if (!model) {
        throw new Error('Tasks collection not found');
    }

    return model;
}




export async function GET(request: Request) {

    try {
        const tasksModel = await getModel('tasks');

        const { searchParams } = new URL(request.url);
        const skipParams = searchParams.get('skip') ?? '0';

        const skipNumber = Number(skipParams)

        if (isNaN(skipNumber)) {
            return NextResponse.json({ msg: "Skip must be a number" }, { status: 400 });
        }

        // Intentar obtener las tareas
        const tasks = await tasksModel.find({}).skip(skipNumber).sort({ createdAt: -1 }).toArray();

        // Retornar las tareas en formato JSON
        return NextResponse.json(tasks);

    } catch (error: any) {
        // Registro del error en la consola para depuración
        console.error('Error fetching tasks:', error);

        // Devolver una respuesta de error al cliente
        return NextResponse.json(
            { message: 'Error fetching tasks', error: error.message },
            { status: 500 }
        );
    }

}



const taskPostSchema = Yup.object().shape({
    title: Yup.string().required().min(3).max(40),
    description: Yup.string().min(3).max(40),
    categories: Yup.object().required()
});

export async function POST(request: Request)  {


    try {

        const taskModel = await getModel('tasks');

        //VALIDAMOS QUE EL BODY COINCIDA CON TASKPOSTSCHEMA
        const body = await taskPostSchema.validate( await request.json() );

        const task = {
            ...body,
            likes: [],
            comment: [],
            status: 'pending',
            isDone: false,
            user: {
                _id: "66e76b1c3f93a500a0a40b7d",
                username: "pepon123"
            },
           createdAt : "2024-09-16T00:32:42.895+00:00"
        }

        const result = await taskModel.insertOne(task);


        if (result.acknowledged) {

            return NextResponse.json({
                message: 'Task created successfully',
                task: { ...task, _id: result.insertedId }
            }, { status: 201 });

        } else {
            throw new Error('Failed to insert task');
        }




    } catch (error) {

        return NextResponse.json({ error, status: 400 });

    }

}



