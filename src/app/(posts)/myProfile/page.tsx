import Profile from '@/components/profile/Profile';
import { Posts } from '@/types';
import { redirect } from 'next/navigation';
import * as token_lib from '@/libs/token/token-verify'


const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

interface ProfileResponse {
    message : string;
    ok : boolean;
    status : number
    user : UserResponse,
}

interface UserResponse{
    _id : string;
    username :string;
    email : string;
    description:string;
    createdAt : string;
}


async function getProfile(id : string): Promise<UserResponse> {
    const res = await fetch(`${API_URL}/api/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        credentials: 'include', 
    });

    const data: ProfileResponse = await res.json(); 
    
    if (!data.ok) {
        if (data.status === 401) {
            // Verifica si el estado HTTP es 401
            redirect('/auth/login');
        }
        throw new Error(`HTTP error! status: ${data.status}, message: ${data.message}`);
    }

    
    return data.user;
}

async function getMyTasks(id : string) : Promise<Posts[]> {
    const res = await fetch(`${API_URL}/api/tasks/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache : 'no-cache',
        credentials : 'include'
    })

    const data = await res.json(); 
    
    if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}, message: ${data.message}`);
    }

    return data.tasks;
   
}

interface TokenData {
    _id: string;
    username: string;
}

export default async function MyProfile() {

    const token_data  = token_lib.decoded_token() as TokenData;

    if(!token_data){
        redirect("/auth/login")
    }

    const [profile,tasks] = await Promise.all([ 
        getProfile(token_data._id),
        getMyTasks(token_data._id)
    ])
    


    return (
        <div>
            <Profile user={profile} posts={tasks} />
        </div>
    )
}
