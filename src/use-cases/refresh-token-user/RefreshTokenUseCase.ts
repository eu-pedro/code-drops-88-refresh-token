import dayjs from "dayjs";
import { prisma } from "../../prisma/client";

export class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        id: refresh_token
      }
    })

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken?.expiresIn!))
    if(refreshTokenExpired) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId: refreshToken?.userId
        }
      })

      throw new Error('Token expired.')
    }
    if(!refreshToken) {
      throw new Error('Refresh token invalid.')
    }

    return { refreshToken }
  }
}