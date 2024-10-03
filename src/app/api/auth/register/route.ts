import * as mongo from '@/mongodb/index';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

export async function POST(request: Request) {
    try {
        const model = await mongo.getModel('users');
        const user_data = await request.json();
        const { username, email, password } = user_data;

        // Verificar si faltan campos requeridos
        if (!username || !email || !password) {
            return NextResponse.json(
                { ok: false, message: 'All fields are required: username, email, and password.' },
                { status: 400 }
            );
        }

        // Verificar si ya existe un usuario con el mismo username o email
        const userExists = await model.findOne({
            $or: [{ username: username }, { email: email }]
        });

        if (userExists) {
            return NextResponse.json(
                { ok: false, message: 'Username or email already exists.' },
                { status: 409 } // 409 Conflict: ya existe un recurso con esos datos
            );
        }

        // Crear nuevo ID y hashear la contraseña
        const new_id = new ObjectId();
        const hash_password = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        await model.insertOne({
            _id: new_id,
            username,
            email,
            password: hash_password,
            description: '',
            createdAt: new Date()
        });

        return NextResponse.json(
            { ok: true, message: 'User created successfully' },
            { status: 201 } // 201 Created: el recurso fue creado exitosamente
        );
        
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { ok: false, message: 'Internal Server Error' },
            { status: 500 } // 500 Internal Server Error
        );
    }
}
