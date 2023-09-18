import dayjs from "dayjs";
import { prisma } from "../prisma/client";

export class GenerateRefreshToken {
  async execute(userId: string ){
    const expiresIn = dayjs().add(30, "seconds").unix()
    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      }
    })
    return generateRefreshToken
  }
}