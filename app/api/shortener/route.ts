import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto"
import { prisma } from "@/prisma/prisma";

const SITE = "loslocos.com"

export async function POST(req: NextRequest){
 const payload = await req.formData();
 const url = payload.get('url') as string;
 const ext = Math.floor(Math.random()*(10-2)+2);
 const uuid = crypto.createHash('sha256').update(url).digest('hex').slice(1,ext)

 const query = await prisma.shortURL.create({
  data:{
   domain:url,
   uuid:uuid,
  }
 });

 if (query !== null){
  return NextResponse.json({
   status:"success",
   new:"https://" + SITE + '/' + uuid,
  });
 } else {
  throw new Error("Database Internal Error: Error creating the row");
 }
}

export async function GET(){

}
