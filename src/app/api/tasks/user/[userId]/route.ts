import { NextResponse } from 'next/server';
import * as mongo from '@/mongodb/index'
import { Segment } from 'next/dist/server/app-render/types';



export async function GET(request : Request , segment : Segment){
    
    try {
        
        const { params } = segment;

        const model  = await mongo.getModel('tasks');
        

        const tasks = await model.find({'user._id' : params.userId}).toArray();



        return NextResponse.json({
            ok: true,
            message: 'Tasks delivered',
            tasks,
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