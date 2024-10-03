import { NextResponse } from 'next/server';
import * as mongo from '@/mongodb/index'
import { Segment } from 'next/dist/server/app-render/types';
import { ObjectId } from 'mongodb';


export async function GET(request : Request , segment : Segment){
    
    try {
        
        const { params } = segment;

        const model  = await mongo.getModel('users');
        
        const id = new ObjectId(String(params.userId))

        const user = await model.findOne({_id :id});


        if(!user){
            return NextResponse.json({
                ok: false,
                message: 'User not found',
                status : 404,
            }, { status: 404});
        }


        return NextResponse.json({
            ok: true,
            message: 'User is logged in',
            user,
            status : 201
        });

    } catch (error) {
        return NextResponse.json({
            ok: false,
            message: 'An error occurred',
            error: error instanceof Error ? error.message : 'Unknown error',
        }, { status: 500 });
    }

}