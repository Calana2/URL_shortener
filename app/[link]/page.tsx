import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import dog from "@/public/dog.png"
import Image from "next/image";

export default async function Page({ params }: { params: { link: string } }) {

async function Redirect(link: string){
 try {
  const res = await prisma.shortURL.findUnique({
   where:{
    uuid: link
   }
  }); 
  await prisma.$disconnect();
 if(res)
  return res.domain;
 else 
  return null;
 } catch(err: any) {
  console.log(err);
 } 
}

const res = await Redirect(params.link);
if(res)
 redirect(res);
 return (
 <div className="flex flex-col w-full h-screen items-center justify-center bg-green-400 gap-5">
  <Image src={dog} alt="_dog" width={350} height={300}/>
  <div className="text-2xl font-semibold">Error 404 - Link does not found</div>
 </div>)
}
