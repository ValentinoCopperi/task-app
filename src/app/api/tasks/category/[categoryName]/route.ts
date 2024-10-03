import { Segment } from "next/dist/server/app-render/types";
import * as mongo from '@/mongodb/index'
import { NextResponse } from "next/server";


function capitalizeFirstLetter(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}



export async function GET( request: Request , segment : Segment){


    try {

        const { params } = segment;

        const category = capitalizeFirstLetter(params.categoryName);

        const model = await mongo.getModel('tasks');

        const posts = await model.find({['categories.name'.toLocaleLowerCase()] : category}).toArray();
        
        return NextResponse.json({
            ok : true,
            posts,
            category,
            status : 201,
            message : "Correct!"
        }, {status : 201 })

    } catch (error) {
        return NextResponse.json({
            ok : false,
            status : 500,
            message : error
        }, {status : 500 })

    }

}