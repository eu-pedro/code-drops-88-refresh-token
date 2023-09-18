import { compare } from "bcryptjs"
import { prisma } from "../../prisma/client"
import { InvalidCredentialsError } from "../errors/invalid-credentials-error"
import jwt from "jsonwebtoken"
import { GenerateRefreshToken } from "../../provider/GenerateRefreshToken"

interface UserRequestProps {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ password, username }: UserRequestProps) {
    // verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { username}
    })

    if(!user) {
      throw new InvalidCredentialsError()
    }

    // se o usuário existe, verificar se a senha está correta.
    const passwordMatch = await compare(password, user.password)
    if(!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    // gerar token do usuário
    const token = jwt.sign({ user: user.name} , "ashduasudhasudhu", {
      subject: user.id,
      expiresIn: '20s'
    })

    const generateRefreshToken = new GenerateRefreshToken()
    const refreshToken = await generateRefreshToken.execute(user.id)

    return { token, refreshToken }
  }
}