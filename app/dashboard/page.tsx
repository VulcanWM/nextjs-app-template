import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { get_user_from_email } from "@/lib/database";

export default async function Home() {
  const authUser = await getServerSession(authOptions);
  const email = authUser?.user?.email || null
  if (email == null){
    redirect("/api/auth/signin")
  }
  const userDoc = await get_user_from_email(email)
  if (userDoc == false){
    redirect("/create-account")
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Dashboard
        </h1>
      </div>
      <p>Hello {userDoc.username}</p>
    </section>
  )
}