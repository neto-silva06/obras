import type { User } from "../../domain/entities/User.js";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";
import { prisma } from "../database/prisma.js";

export class PrismaUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user ? (user as unknown as User) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    return user ? (user as unknown as User) : null;
  }

  async list(): Promise<User[]> {
    const users = await prisma.user.findMany({
      orderBy: { name: 'asc' }
    });
    return users as unknown as User[];
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.password!,
        name: data.name,
        role: data.role as any,
      },
    });
    return user as unknown as User;
  }

  async update(id: string, data: Partial<Omit<User, 'id'>>): Promise<User> {
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(data.email ? { email: data.email } : {}),
        ...(data.name ? { name: data.name } : {}),
        ...(data.role ? { role: data.role as any } : {}),
        ...(data.password ? { password: data.password } : {}),
      },
    });
    return user as unknown as User;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
