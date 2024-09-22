import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import cat from "@/public/cat.gif"
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
  <Image src={cat} alt="_dog" width={350} height={300} className=""/>
  <div className="text-2xl font-semibold text-center z-20 w-1/2 
   text-white bg-black p-1 break-all">
   {`Error 404 - Alias "${params.link}" does not found`}</div>
 </div>)
}


