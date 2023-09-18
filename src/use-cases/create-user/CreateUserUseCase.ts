import { prisma } from "../../prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "../errors/user-already-exists-error"

interface UserRequestProps {
  name: string
  password: string
  username: string
}

export class CreateUserUseCase {
  async execute ({ name, password, username }: UserRequestProps){
    // verificar se o usuário existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        username
      }
    })

    if(userAlreadyExists) {
      throw new UserAlreadyExists()
    }

    // se ele não existir:
    // cadastra usuário
    const passordHash = await hash(password, 6)
    const user = await prisma.user.create({
      data: {
        name, 
        username,
        password: passordHash
      }
    })
    console.log(user)

    return { user }
  }
}