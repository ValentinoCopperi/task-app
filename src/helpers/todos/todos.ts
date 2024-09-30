import { Posts, UserLogin, UserRegister } from "@/types";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";


interface CreateTaskDto {
    title: string;
    description: string;
    categories: any
}

export const updateTodoStatus = async (id: string, status: string): Promise<any> => {

    const body = {
        status
    }

    const task = await fetch(`http://localhost:3001/tasks/status/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(res => res.json())

    if (!task) {
        throw new Error('Task not found')
    }

    return task;


}

export const createTodo = async (createTaskDto: CreateTaskDto) => {


    const res = await fetch(`http://localhost:3001/tasks`, {
        method: 'POST',
        body: JSON.stringify(createTaskDto),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

    const task = await res.json()

    return task;
}

export const deleteTodo = async (id: string) => {
    const body = {
        userId: "66e76b1c3f93a500a0a40b7d"
    }
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }


}

export const addComent = async (id: string, comment: string) => {

    const body = {
        comment
    }

    const res = await fetch(`http://localhost:3001/tasks/comment/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }


}
export const deleteComment = async (idPost: string, idComment: string) => {



    const res = await fetch(`http://localhost:3001/tasks/comment/${idPost}/${idComment}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }


}

export const addLike = async (id: string) => {


    const res = await fetch(`http://localhost:3001/tasks/${id}/like`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

}

export const deleteLike = async (id: string) => {


    const res = await fetch(`http://localhost:3001/tasks/${id}/like`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

}


export const logout = async () => {

    const res = await fetch("http://localhost:3001/auth/logout", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }

}

interface LoginSuccessData {
    message: string;
    token: string;
    username: string;
}

export const login = async (userData: UserLogin) => {


    const res = await fetch("http://localhost:3001/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(userData),
        cache: 'no-store'
    });



    if (!res.ok) {
        return { msg: 'Wrong Credentials' }
    }

    const data: LoginSuccessData = await res.json();



    return { msg: `Welcome ${data.username} `, username: data.username }

}

export const register = async (userData: UserRegister) => {


    const res = await fetch("http://localhost:3001/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(userData),
        cache: 'no-store'
    });


    if (!res.ok) {
        if(res.status !== 201 && res.status !== 200) return { error : true }
    }
    

    const data = await res.json();




}

export const updateBio = async ( biography:string) => {
    const body = {
        biography
    }

    const res = await fetch(`http://localhost:3001/users/biography`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error(res.statusText)
    }
}

