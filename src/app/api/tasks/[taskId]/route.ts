import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import * as Yup from 'yup'
import { Segment } from 'next/dist/server/app-render/types';
import * as mongo from '@/mongodb/index'
import * as jwt from '@/libs/token/token-verify'






export async function GET(request: Request , segment : Segment) {

    try {

        const { params } = segment;
        
        const id =  new ObjectId(params.taskId)

        const taskModel = await mongo.getModel('tasks');

        const task = await taskModel.findOne({_id : id});


        if(!task){
            return NextResponse.json(
                { message: 'Task Not Found'},
                { status: 404 }
            );
        }

        // Retornar las tareas en formato JSON
        return NextResponse.json(task);

    } catch (error : unknown) {
        // Registro del error en la consola para depuración
        console.error('Error fetching tasks:', error);

        // Devolver una respuesta de error al cliente
        return NextResponse.json(
            { message: 'Error fetching tasks', error: error },
            { status: 500 }
        );
    }
    
}

export async function DELETE(request : Request , segments : Segment){

    try {
        
        const token_data =  jwt.decoded_token();

        if(!token_data){
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Must be logged in',
                },
                { status: 401 }
            );
        }

        const model = await mongo.getModel('tasks');

        const { params } = segments;

        const post_id = new ObjectId(String(params.taskId));

       await model.findOneAndDelete({_id : post_id})

        return NextResponse.json(
            {
                ok: true,
                message: 'Task Deleted',
                status : 201
            },
            { status: 201 }
        );

        

    } catch (error) {
        return NextResponse.json(
            {
                ok: false,
                message: error,
                status : 500
            },
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
export async function PUT(request : Request){


    try {


        const taskModel = await mongo.getModel('tasks');

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