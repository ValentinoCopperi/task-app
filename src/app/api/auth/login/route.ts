import * as mongo from '@/mongodb/index';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'fallback_secret_key';
const JWT_EXPIRY = '1h'; // 1 hour expiry

export async function POST(request: Request) {
    try {
        const model = await mongo.getModel('users');
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({
                ok: false,
                status: 400,
                message: 'Email and password are required',
            }, { status: 400 });
        }

        const user = await model.findOne({ email });

        if (!user) {
            return NextResponse.json({
                ok: false,
                status: 404,
                message: 'User not found',
            }, { status: 404 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json({
                ok: false,
                status: 401,
                message: 'Invalid credentials',
            }, { status: 401 });
        }

        const token = jwt.sign(
            { _id: user._id, username: user.username },
            JWT_SECRET_KEY,
            { expiresIn: JWT_EXPIRY }
        );

        const cookieStore = cookies();
        cookieStore.set('SESSION_USER', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 360000, // 1 hour in seconds
        });

        return NextResponse.json({
            ok: true,
            status: 200,
            message: `Welcome back, ${user.username}!`,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        }, { status: 200 });

    } catch (error) {
        console.error('Authentication error:', error);
        return NextResponse.json({
            ok: false,
            status: 500,
            message: 'An unexpected error occurred. Please try again later.',
        }, { status: 500 });
    }
}