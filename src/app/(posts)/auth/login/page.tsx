"use client"
import {  UserLogin } from '@/types'
import React, { FormEvent, useState } from 'react'
import Link from 'next/link';
import { login } from '@/helpers';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Res {
  msg : string;
  username? : string;
}


export default function Login() {
  
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[loginResponse,setLoginResponse] = useState<string | null>(null)

  const router = useRouter();

  const handleLogin = (e : FormEvent<HTMLFormElement>) =>{
    
    e.preventDefault();
    
    login({email,password})
    .then((res : Res) => {
      setLoginResponse(res.msg)
      router.refresh()
    })
    .catch(error => setLoginResponse(error))
    
    
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
              Iniciar sesión
            </button>
          </div>
          {
            loginResponse && (
              <p className='text-center text-red-700'> {loginResponse} </p>
            )
          }
          <div className='text-center'>
            <Link className= 'text-blue-500 underline' href={'/auth/register'}>Create Account</Link>
          </div>
        </form>
      </div>
    </div>

  )
}
