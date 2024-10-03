import * as jwt from '@/libs/token/token-verify';
import * as mongo from '@/mongodb/index'
import { NextResponse } from "next/server"; // Asegúrate de importar NextResponse
import { ObjectId } from "mongodb";

export async function PUT(request: Request) {
    try {
        const token_data = jwt.decoded_token();

        if (!token_data) {
            return NextResponse.json({
                ok: false,
                status: 401,
                message: 'Unauthorized: Token is missing or invalid.'
            });
        }

        const user_id = new ObjectId(String(token_data?._id));

        const body = await request.json();
        const new_bio = body.biography;

        const model = await mongo.getModel('users');

        const user = await model.findOneAndUpdate(
            { _id: user_id },
            {
                $set: { description: new_bio }
            },
            { returnDocument: 'after' } // Opcional: devuelve el documento actualizado
        );

        if (!user) {
            return NextResponse.json({
                ok: false,
                status: 404,
                message: 'User not found.'
            });
        }

        return NextResponse.json({
            ok: true,
            status: 200,
            message: 'Biography updated successfully.'
        });

    } catch (error) {
        return NextResponse.json({
            ok: false,
            status: 500,
            message: error || 'An error occurred while updating the biography.'
        });
    }
}
