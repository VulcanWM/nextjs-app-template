'use server'

import { create_user, get_user_from_email } from "@/lib/database"
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createUserFunction(prevState: { message: string } | { message: boolean }, formData: FormData) {
    const username = formData.get("username") as string
    const authUser = await getServerSession(authOptions);
    const email = authUser?.user?.email || null
    if (email == null){
        return {message: "You are not logged in"}
    } else {
        const user_from_email = await get_user_from_email(email)
        if (user_from_email != false){
            return {message: true}
        }
        const func = await create_user(username, email as string)
        return {message: func}
    }
}