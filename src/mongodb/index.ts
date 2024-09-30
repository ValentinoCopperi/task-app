import mongoose from "mongoose";
import { ObjectId } from 'mongodb';


export function serializeMongoObject(obj: any): any {
    if (Array.isArray(obj)) {
        // Si obj es un array, serializamos cada elemento recursivamente
        return obj.map(item => serializeMongoObject(item));
    }

    // Si obj no es un array, procedemos como antes
    if (obj instanceof ObjectId) {
        return obj.toHexString();
    }

    if (obj instanceof Date) {
        return obj.toISOString();
    }

    if (typeof obj === 'object' && obj !== null) {
        const newObj: any = {};
        for (const [key, value] of Object.entries(obj)) {
            newObj[key] = serializeMongoObject(value);
        }
        return newObj;
    }

    return obj;
}



export async function dbConnect() {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(process.env.MONGODB_URI as string);
}

export async function getModel(modelName: string) {
    if (!modelName) {
        throw new Error('Tasks collection not found');
    }

    await dbConnect();
    const model = mongoose.connection.db?.collection(modelName);

    if (!model) {
        throw new Error('Tasks collection not found');
    }

    return model;
}

export *  from './'