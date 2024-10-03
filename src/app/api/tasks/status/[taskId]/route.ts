import { Segment } from "next/dist/server/app-render/types";
import * as jwt from '@/libs/token/token-verify'
import * as mongo from '@/mongodb/index'
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request : Request , segments : Segment){


    try {
        
        const token_data = jwt.decoded_token();

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
        const new_status = await request.json();

       await model.findOneAndUpdate(
            {_id : post_id},
            {
                $set : { status :  new_status.status }
            }
        );

        return NextResponse.json(
            {
                ok: true,
                message: 'Status updated',
                status : 200
            },
            { status: 200 }
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