import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function POST() {
    try {


        const cookieStore = cookies();
        cookieStore.delete('SESSION_USER')

        return NextResponse.json({
            ok: true,
            status: 200,
            message: `Logout Correctly!`,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            ok: false,
            status: 500,
            message: 'An unexpected error occurred. Please try again later.',
        }, { status: 500 });
    }
}