import { prisma } from "../../prisma/client";

export class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: {
        id: refresh_token
      }
    })

    if(!refreshToken) {
      throw new Error('Refresh token invalid.')
    }

    return { refreshToken }
  }
}