import { ObjectId } from 'mongodb';
import dbConnect from '@/libs/mongo/mongo';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';


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



export async function POST(request: Request, segment: Segments) {


    try {

        const user = {
            _id: "66e76b1c3f93a500a0a40b7d",
            username: "pepon123"
        }
       
        const { params } = segment;

        const id = new ObjectId(params.taskId)
      
        const model = await getModel('tasks');

        const task = await model.findOne({ _id: id });
        
        if (!task) {
            return NextResponse.json(
                { message: 'Task Not Found' },
                { status: 404 }
            );
        }

        await model.findOneAndUpdate(
            id,
            {
                $addToSet: { likes: { _id: user._id, username: user.username } }
            },

        );


        return NextResponse.json(
            { message: 'Like added' },
            { status: 200 }
        );


    } catch (error) {

        return NextResponse.json({ error, status: 400 });

    }

}



