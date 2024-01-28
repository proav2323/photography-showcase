import getCurrentUser  from "@/actions/getCurrentUser";


export default async function Home() {
   const currentUser = await getCurrentUser()
  return (
     <div>hi</div>
  );
}
