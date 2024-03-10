import dbConnect from './mongodb';
import User from '../models/User';
import { Types } from 'mongoose';

export async function get_user(username: string) {
    await dbConnect();
    const user = await User.find({username: username})
    if (user.length == 0){
        return false
    } else {
        return user[0]
    }
}

export async function get_user_from_email(email: string) {
    await dbConnect();
    const user = await User.find({email: email})
    if (user.length == 0){
        return false
    } else {
        return user[0]
    }
}

export async function create_user(username: string, email: string) {
    await dbConnect();
    username = username.toLowerCase();
    username = username.replaceAll(" ", "_")
    if (await get_user(username) != false){
        return "This username already exists!"
    }
    if (await get_user_from_email(email) != false){
        return "This email is already being used for an account!"
    }
    if (username.length > 20){
        return "Your username cannot have more than 20 characters!"
    }
    if (username.length < 3){
        return "Your username must be at least 3 characters long!"
    }
    const created = new Date()
    const user = await User.create({
        username: username, 
        email: email, 
        created: created, 
        banned: false,
        wins: 0,
        losses: 0,
        draws: 0,
        currency: 0,
        badges: ['Early User'] 
    })
    return true
}