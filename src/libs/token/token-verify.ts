import { cookies } from "next/headers"
import * as jwt from 'jsonwebtoken';

interface TokenData {
    _id: string;
    username: string;
}

export const decoded_token = (): TokenData | null => {
    try {
        const cookie_store = cookies();

        // Verifica si la cookie existe
        if (!cookie_store.has('SESSION_USER')) {
            console.warn("SESSION_USER cookie not found");
            return null;
        }

        const token = cookie_store.get("SESSION_USER")?.value; // Asegúrate de acceder a .value

        // Asegúrate de que el token no esté vacío
        if (!token) {
            console.warn("SESSION_USER cookie is empty");
            return null;
        }

        // Decodifica el token sin verificar
        const token_data = jwt.decode(token) as TokenData;

        // Verifica si token_data es válido
        if (!token_data) {
            console.warn("Failed to decode token");
            return null;
        }

        return token_data;

    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};