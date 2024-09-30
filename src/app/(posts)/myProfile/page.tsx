import Profile from '@/components/profile/Profile';
import { Posts, UserData } from '@/types';
import { headers } from 'next/headers'
import { redirect } from 'next/navigation';





async function getProfile() : Promise<UserData> {
    const res = await fetch(`http://localhost:3001/auth/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Forward the cookie header
            'Cookie': headers().get('cookie') ?? ''
        }
    })

    if (!res.ok) {
        // Use status and statusText for more informative error
        if(res.status === 401){
            redirect('/auth/login')
        }
        throw new Error(`HTTP error! status: ${res.status}, ${res.statusText}`)
    }

    return res.json()
}

async function getMyTasks() : Promise<Posts[]> {
    const res = await fetch(`http://localhost:3001/tasks/myTasks`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Forward the cookie header
            'Cookie': headers().get('cookie') ?? ''
        }
    })

    if (!res.ok) {
        // Use status and statusText for more informative error
        if(res.status === 401){
            redirect('/auth/login')
        }
        throw new Error(`HTTP error! status: ${res.status}, ${res.statusText}`)
    }

    return res.json()
}



export default async function MyProfile() {


    const [profile,tasks] = await Promise.all([ 
        getProfile(),
        getMyTasks()
    ])
    


    return (
        <div>
            <Profile user={profile} posts={tasks} />
        </div>
    )
}
