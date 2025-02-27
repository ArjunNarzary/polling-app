import prismaClient from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { optionId } = await req.json()
    await prismaClient.option.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Vote registered",
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    )
  }
}
