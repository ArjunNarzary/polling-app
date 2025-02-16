import prismaClient from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { question, options } = await req.json()
  const poll = await prismaClient.poll.create({
    data: {
      question,
      options: { create: options.map((text: string) => ({ text })) },
    },
    include: { options: true },
  })
  return NextResponse.json(poll, { status: 201 })
}

export async function GET() {
  const polls = await prismaClient.poll.findMany({
    include: { options: true },
    orderBy: { createAt: "desc" },
  })
  return NextResponse.json(polls, { status: 200 })
}
