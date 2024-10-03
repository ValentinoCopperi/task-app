import dbConnect from '@/libs/mongo/mongo';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import * as Yup from 'yup'
import * as token_lib from '@/libs/token/token-verify'



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

    } catch (error) {
        // Registro del error en la consola para depuración
        console.error('Error fetching tasks:', error);

        // Devolver una respuesta de error al cliente
        return NextResponse.json(
            { message: 'Error fetching tasks', error: error },
            { status: 500 }
        );
    }

}



const taskPostSchema = Yup.object().shape({
    title: Yup.string().required().min(3).max(40),
    description: Yup.string().min(3).max(40),
    categories: Yup.object().required()
});

export async function POST(request: Request) {
    try {
        const token_data = token_lib.decoded_token();
        
        if (!token_data) {
            return NextResponse.json({
                ok: false,
                message: "Must be logged in",
                status: 401,
            }, { status: 401 });
        }

        const taskModel = await getModel('tasks');

        // Validate body with taskPostSchema
        const body = await taskPostSchema.validate(await request.json());

        const task = await taskModel.insertOne({
            ...body,
            user: {
                _id: token_data._id,
                username: token_data.username,
            },
            likes: [],
            comments: [],
            status: "in_progress", // corrected typo
            createdAt: new Date(),
        });

        return NextResponse.json({
            ok: true,
            message: "Task created!",
            status: 201,
            task,
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ ok: false, message: error instanceof Error ? error.message : 'Server Error', status: 500 });
    }
}
