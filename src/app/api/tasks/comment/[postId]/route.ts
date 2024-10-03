import { Segment } from "next/dist/server/app-render/types";
import * as jwt from '@/libs/token/token-verify'
import { NextResponse } from "next/server";
import * as mongo from '@/mongodb/index';
import { ObjectId } from "mongodb";
export async function POST(request : Request , segemnt : Segment){

    try {
        const { params } = segemnt;
        const token_data = jwt.decoded_token();
        const comment = await request.json();
        const post_id  =  new ObjectId(String(params.postId));

        if(!token_data){
            return NextResponse.json({
                ok : false,
                status : 401,
                message : 'Unhautorized',
            }, { status : 401 })
        }

        
        

        const model = await mongo.getModel('tasks');
        
        const generateCommentId = new ObjectId();

        await model.findOneAndUpdate(
            { _id: post_id },
            {
                $addToSet: { 
                    comments: { 
                        _id: generateCommentId, // Asegúrate de llamar a la función para generar el ID
                        username: token_data.username, 
                        content: comment.comment,
                        createdAt : new Date() // Asegúrate de que `comment.comment` esté correctamente definido como `comment.content`
                    }
                }
            },
            { returnDocument: 'after' } // Devuelve el documento actualizado
        );
        


        return NextResponse.json(
            { message: 'Comment added successfully', ok: true },
            { status: 200 }
        );
        
        
    } catch (error) {
        console.log(error)
    }


}