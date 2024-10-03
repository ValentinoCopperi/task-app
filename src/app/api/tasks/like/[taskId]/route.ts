import { ObjectId } from 'mongodb';
import dbConnect from '@/libs/mongo/mongo';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { Segment } from 'next/dist/server/app-render/types';

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

interface JwtDataDecoded {
    _id: string;
    username: string;
}


export async function POST(request: Request, segment: Segment) {
    try {
        const cookieStore = cookies();

        if (!cookieStore.has("SESSION_USER")) {
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Must be logged in',
                },
                { status: 401 }
            );
        }

        const token_session = cookieStore.get('SESSION_USER');

        const data_user = jwt.decode(String(token_session?.value)) as JwtDataDecoded;

        const { params } = segment;

        if (!params || !params.taskId) {
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Task ID is required',
                },
                { status: 400 }
            );
        }

        const id = new ObjectId(String(params.taskId));
        const model = await getModel('tasks');

        const task = await model.findOne({ _id: id });

        if (!task) {
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Task not found',
                },
                { status: 404 }
            );
        }

        // Replace 'user' with the actual user object from token_data or your session.

        await model.findOneAndUpdate(
            { _id: id },
            {
                $addToSet: { likes: { _id: data_user._id, username: data_user.username } },
            }
        );

        return NextResponse.json(
            { message: 'Like added successfully', ok: true },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                ok: false,
                message: 'An error occurred',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}





export async function DELETE(request: Request, segment: Segment) {
    try {
        const cookieStore = cookies();

        if (!cookieStore.has("SESSION_USER")) {
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Must be logged in',
                },
                { status: 401 }
            );
        }

        const token_session = cookieStore.get('SESSION_USER');

        const data_user = jwt.decode(String(token_session?.value)) as JwtDataDecoded;

        const { params } = segment;

        if (!params || !params.taskId) {
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Task ID is required',
                },
                { status: 400 }
            );
        }

        const id = new ObjectId(String(params.taskId));
        const model = await getModel('tasks');

        const task  = await model.findOne({ _id: id }) ;

        if (!task) {
            return NextResponse.json(
                {
                    ok: false,
                    message: 'Task not found',
                },
                { status: 404 }
            );
        }

        // Replace 'user' with the actual user object from token_data or your session.
        const updatedLikes = task.likes.filter((like: { username: string }) => like.username !== data_user.username);

       
        await model.updateOne(
            { _id: id },
            { $set: { likes: updatedLikes } }
        );

        return NextResponse.json(
            { message: 'Like deleted successfully', ok: true },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                ok: false,
                message: 'An error occurred',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
