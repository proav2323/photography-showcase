import getCurrentUser  from "@/actions/getCurrentUser";
import Image from "next/image";
import { redirect } from "next/navigation";


export default async function Home() {
   const currentUser = await getCurrentUser()
  return (
     <div>hi</div>
  );
}
