
export interface User {
    _id: string;
    username: string;
}

export interface UserData {
    _id : string;
    username : string;
    email : string;
    description? : string;
    createdAt : string;
}

export interface UserLogin {
    email : string;
    password : string;
}

export interface UserRegister {
    email : string;
    password : string;
    username : string
}
export interface DecodedToken {
    _id: string;
    username: string;
    exp: number; // Fecha de expiración del token en formato UNIX timestamp
}

// Tipo para la categoría
export interface Category {
    _id: string;
    name: string;
}

export interface Comment {
    _id : string;
    username : string;
    content : string;
    createdAt:string;
}

export type Status = 'pending' | 'done' | 'cancelled' | 'in_progress'

// Tipo principal para el item de todo
export interface Posts {
    _id: string;
    title: string;
    description: string;
    isDone: boolean;
    user: User;
    categories: Category;
    status : Status;
    comments : Comment[]
    likes: User[]; // Asumiendo que los likes son IDs de usuario
    createdAt: string;
    updatedAt: string;
    __v: number;
}