'use client'
 
import { useFormState } from 'react-dom'
import { createUserFunction } from '@/app/actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from '@/components/ui/button'


const initialState = {
  message: false,
};

 
export default function Signup() {
  const router = useRouter()
  const [state, formAction] = useFormState(
    createUserFunction,
    initialState
  );
 
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Create Account
        </h1>
      </div>
      {state.message == true ? 
      <>
        <p>Your account has been created.</p>
        <Link href="/dashboard" rel="noreferrer" className={buttonVariants() + " w-[100px]"}>Dashboard</Link>
        </>
      : 
      state.message == "You are not logged in" ? 
      <>
        <p className="text-red-500">You are not logged in</p>
        <p className="text-lg"><Link className="text-blue-400 hover:text-blue-300" href="/">Sign in with OAuth</Link></p>
      </> :
      <div>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          To have an account, you need to choose a username
        </p>
        <br/>
        <form className='flex' action={formAction}>
          <p className="text-red-500">{state.message}</p>
          <Input name="username" id="username" placeholder="username" className="w-[200px] mr-5"/>
          <Button type="submit">set username</Button>
        </form>
      </div>
      }
    </section>
  )
}