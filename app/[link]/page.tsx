import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import dog from "@/public/dog.png"
import Image from "next/image";

export default async function Page({ params }: { params: { link: string } }) {

async function Redirect(link: string){
"use server" // unn
 try {
  const res = await prisma.linker.findUnique({
   where:{
    alias: link
   }
  }); 
  await prisma.$disconnect();
 if(res)
  return res.domain;
 return null;
 } catch(err: any) {
  console.log(err);
 } 
}

const domain = await Redirect(params.link);
if(domain)
 redirect(domain);


 return (
 <div className="flex flex-col w-full h-screen items-center justify-center gap-5">
  <Image src={dog} alt="_dog" width={350} height={300} className="border-2 border-black"/>
  <div className="text-2xl font-semibold text-center">Error 404 - Link does not found</div>
  {(params.link)}
 </div>)
}


