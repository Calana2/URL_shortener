import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";


// Create
export async function POST(req: NextRequest) {
  try {
    const payload = await req.formData();
    const url = payload.get('url') as string;
    const alias = payload.get('alias') as string;


    // Zod validation
    const aliasRegex = new RegExp('^[a-zA-Z0-9_-]+$')
    const schema = z.object({
      url: z.string()
        .min(1, { message: "The URL field cannot be empty" })
        .url({ message: "The URL field must be a URL" }),
      alias: z.string()
        .min(3, { message: "The alias field must contain at least 3 characters" })
        .regex(aliasRegex, { message: "Symbols not allowed in alias" }),
    })

    schema.parse({ url: url, alias: alias })




    // Prisma interaction with Postgresql
    await prisma.linker.create({
      data: {
        domain: url,
        alias: alias,
      }
    })

    return Response.json({ alias: 'https://' + req.nextUrl.host + '/' + alias }, { status: 200 })


  } catch (err) {
    // Prisma error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      switch (err.code) {
        case 'P1001':
          return Response.json({ errMsg: "Database does not found" }, { status: 404 })
        case 'P1002':
          return Response.json({ errMsg: "Database connection time exceeded" }, { status: 500 })
        case 'P2002':
          return Response.json({ errMsg: "Alias already exists" }, { status: 500 })
        default:
          return Response.json({ errMsg: "Prisma error" }, { status: 500 })
      }
    } else if (err instanceof z.ZodError) {
      const zodError = err as z.ZodError
      const issues = zodError.issues
      return Response.json({ errMsg: issues[0].message }, { status: 500 })
    }

    // normal error
    return NextResponse.json({ errMsg: "Database internal error" }, { status: 500 })
  }
}
