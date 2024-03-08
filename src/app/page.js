"use client"
import {useSession,signIn,signOut} from "next-auth/react"
import Navbar from "./components/Navbar";
import Heropage from "./components/Heropage";

export default function Home() {
  const {data:session} = useSession();
  console.log(session);
  return (
   <div>
   {/* <h2>Sign with Google</h2>
   <img src={session?.user?.image} alt="" />
   <h2>{session?.user?.name}</h2>
   <h2>{session?.user?.email}</h2>
   <button onClick={()=>signIn("google")}>Sign in Google</button>
   <button onClick={()=>signOut()}>Sign out Google</button> */}
   <Navbar/>
   <Heropage/>
   </div>
  );
}
