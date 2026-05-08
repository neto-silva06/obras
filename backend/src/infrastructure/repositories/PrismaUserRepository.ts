import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { prisma } from "../database/prisma";
export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } });
  }
  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } });
  }
  async create(data: Omit<User, 'id'>): Promise<User> {
    return await prisma.user.create({
      data: {
        email: data.email,
        password: data.password!,
        name: data.name,
      },
    });
  }
}
