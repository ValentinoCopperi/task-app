import { Posts, UserRegister } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
interface CreateTaskDto {
    title: string;
    description: string;
    categories:  {
        _id  :string,
        name : string
    } | undefined
}

export const updateTodoStatus = async (id: string, status: string): Promise<string | Posts> => {

    const body = {
        status
    }

    const res = await fetch(`${API_URL}/api/tasks/status/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const data = await res.json();

    if (!data.ok) {
        throw new Error('Task not found')
    }

    return data.task;


}

export const createTodo = async (createTaskDto: CreateTaskDto) => {
    const res = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        body: JSON.stringify(createTaskDto),
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
};
export const deleteTodo = async (id: string) => {


    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const data = await res.json();
    if (!data.ok) {
        throw new Error(data.message)
    }


}

export const addComent = async (id: string, comment: string) => {
    const body = { comment };

    const res = await fetch(`${API_URL}/api/tasks/comment/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include' // Incluye las cookies para la autenticación
    });

    const data = await res.json();

    if (!data.ok) {
        // Manejar el error dependiendo del código de estado
        if (res.status === 401) {
            throw new Error('Unauthorized');
        } else if (res.status === 404) {
            throw new Error('Post not found');
        } else {
            throw new Error(data.message || 'An error occurred during the request');
        }
    }

    return data;
};

export const deleteComment = async (idPost: string, idComment: string) => {



    const res = await fetch(`${API_URL}/api/tasks/comment/${idPost}/${idComment}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const data = await res.json();

    if (!data.ok) {
        // Manejar el error dependiendo del código de estado
        if (res.status === 401) {
            throw new Error('Unauthorized');
        } else if (res.status === 404) {
            throw new Error('Post not found');
        } else {
            throw new Error(data.message || 'An error occurred during the request');
        }
    }




}



export const addLike = async (id: string) => {


    const res = await fetch(`${API_URL}/api/tasks/like/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        cache: 'no-store',
        credentials: 'include'
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
    }

    return data;


}

export const deleteLike = async (id: string) => {


    const res = await fetch(`${API_URL}/api/tasks/like/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'An error occurred');
    }

    return data;

}




interface UserLogin {
    email: string;
    password: string;
}

interface LoginResponse {
    ok: boolean;
    message: string;
    user?: {
        id: string;
        username: string;
        email: string;
    };
}





export const login = async (userData: UserLogin): Promise<LoginResponse> => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(userData),
        cache: 'no-store'
    });

    const data: LoginResponse = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'An error occurred during login');
    }

    return data;
};

export const logout = async () => {

    const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'An error occurred during logout');
    }

    return data.message

}


export const register = async (userData: UserRegister) => {


    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify(userData),
        cache: 'no-store'
    });

    const data = await res.json();

    if (!data.ok) {
        throw new Error(data.message)
    }

    return data.message;

}

export const updateBio = async (biography: string) => {
    const body = {
        biography
    }

    const res = await fetch(`${API_URL}/api/users`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
    })

   const data = await res.json();

   if(!data.ok){
    throw new Error(data.message)
   }

   return data.message;
}

