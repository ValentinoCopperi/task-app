import { Posts } from "@/types";
import { ObjectId } from 'mongodb';
import mongoose from "mongoose";
import * as mongo from '@/mongodb/index'

interface NavigationData {
    page? : number;
    take? : number;
}

export async function getPosts({ page = 1, take = 6 }: NavigationData = {}): Promise<any> {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

    try {
        const model = await mongo.getModel('tasks');
        const posts = await model
            .find()
            .limit(take)
            .sort( { createdAt : -1 } )
            .skip((page - 1) * take)
            .toArray();

        const postsData = mongo.serializeMongoObject(posts) as Posts[];

        const totalPosts = await model.countDocuments({})
        const totalPages = Math.ceil( totalPosts  / take );

        return {
            currentPage : page,
            totalPages,
            postsData
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

