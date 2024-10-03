"use client"
import React, { FormEvent, useState } from 'react'
import Link from 'next/link';
import { login } from '@/helpers';
import { useRouter } from 'next/navigation';

export default function Login() {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginStatus(null);

    try {
      const res = await login({ email, password });
      setLoginStatus({ message: res.message, isError: false });
      router.refresh();
      // Optionally, redirect the user or update global state here
    } catch (error) {
      setLoginStatus({
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
        isError: true
      });
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="min-h-screen  flex items-center justify-center">

      <div className="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            Iniciar sesión
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Correo electrónico"
              className="w-full h-10 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full h-10 bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
             {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
         
          {loginStatus && (
            <p className='text-center' style={{ color: loginStatus.isError ? 'red' : 'green' }}>
              {loginStatus.message}
            </p>
          )}
          <div className='text-center'>
            <Link className='text-blue-500 underline' href={'/auth/register'}>Create Account</Link>
          </div>
        </form>
      </div>
    </div>

  )
}
