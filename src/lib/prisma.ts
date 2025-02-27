/* eslint-disable  @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../../prisma/generated/client"

let prismaClient: PrismaClient

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient()
} else {
  if (!(global as any).prismaClient) {
    ;(global as any).prismaClient = new PrismaClient()
  }
  prismaClient = (global as any).prismaClient
}

export default prismaClient
