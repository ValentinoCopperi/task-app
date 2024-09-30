import dbConnect from '@/libs/mongo/mongo';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import * as Yup from 'yup'


interface Segments {
    params : {
        taskId : string;
    }
}


export async function getModel(modelName : string) {

    if(!modelName){
        throw new Error('Tasks collection not found');
    }

    await dbConnect();
    const model = mongoose.connection.db?.collection(modelName);

    if (!model) {
        throw new Error('Tasks collection not found');
    }

    return model;
}



export async function GET(request: Request , segment : Segments) {

    try {

        const { params } = segment;
        
        const id =  new ObjectId(params.taskId)

        const taskModel = await getModel('tasks');

        const task = await taskModel.findOne({_id : id});


        if(!task){
            return NextResponse.json(
                { message: 'Task Not Found'},
                { status: 404 }
            );
        }

        // Retornar las tareas en formato JSON
        return NextResponse.json(task);

    } catch (error : any) {
        // Registro del error en la consola para depuración
        console.error('Error fetching tasks:', error);

        // Devolver una respuesta de error al cliente
        return NextResponse.json(
            { message: 'Error fetching tasks', error: error.message },
            { status: 500 }
        );
    }
    
}

//TODO FIX POST FUNCTION

const taskPutSchema = Yup.object().shape({
    title: Yup.string().min(3).max(40),
    description: Yup.string().min(3).max(40),
    categories: Yup.object()
});
export async function PUT(request : Request , segment : Segments){


    try {

        const { params } = segment;

        const taskModel = await getModel('tasks');

        //VALIDAMOS QUE EL BODY COINCIDA CON TASKPOSTSCHEMA
        const body = await taskPutSchema.validate( await request.json() );

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