"use client"
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation';
import { register } from '@/helpers';

export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [loginResponse, setLoginResponse] = useState<string | null>(null)
    const [loading, setLoading] = useState(false); // Estado para el loading

    const router = useRouter();

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== checkPassword) {
            setLoginResponse('Passwords must be identical');
            return;
        }

        if (!username || !email || !password) {
            setLoginResponse('Please complete all fields');
            return;
        }

        setLoading(true); // Activar el estado de carga

        try {
            const responseMessage = await register({ username, email, password });
            setLoginResponse(responseMessage);
            router.refresh();
        } catch (error) {
            if (error instanceof Error){
                setLoginResponse(error.message || 'An unknown error occurred'); // Manejo de errores
            }
            setLoginResponse('An unknown error occurred'); // Manejo de errores
        } finally {
            setLoading(false); // Desactivar el estado de carga
        }
    }

    return (
        <div className="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-white">
                    Create Account
                </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                <div className="space-y-4">
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full h-10 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full h-10 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full h-10 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <input
                        type="password"
                        required
                        value={checkPassword}
                        onChange={(e) => setCheckPassword(e.target.value)}
                        placeholder="Repeat Password"
                        className="w-full h-10 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading} // Deshabilitar el botón durante la carga
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? 'Creating...' : 'CREATE'} {/* Mostrar el texto de carga */}
                    </button>
                </div>
                {
                    loginResponse && <h1 className='text-center text-blue-500 text-2xl'> {loginResponse} </h1>
                }
                <div className='text-center'>
                    <Link className='text-blue-500 underline' href={'/auth/login'}>Sign In</Link>
                </div>
            </form>
        </div>
    )
}
