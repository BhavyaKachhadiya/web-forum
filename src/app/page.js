"use client"
import {useSession,signIn,signOut} from "next-auth/react"

export default function Home() {
  const {data:session} = useSession();
  console.log(session);
  return (
   <>
   <h2>Sign with Google</h2>
   <img src={session?.user?.image} alt="" />
   <h2>{session?.user?.name}</h2>
   <button onClick={()=>signIn("google")}>Sign in Google</button>
   <button onClick={()=>signOut()}>Sign out Google</button>
   </>
  );
}
