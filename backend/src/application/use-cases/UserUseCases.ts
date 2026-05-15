import bcrypt from "bcryptjs";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";
import type { User } from "../../domain/entities/User.js";

export class ListUsers {
  constructor(private userRepository: UserRepository) {}
  async execute(): Promise<User[]> {
    return await this.userRepository.list();
  }
}

export class CreateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) throw new Error("Email already in use");

    const hashedPassword = await bcrypt.hash(data.password!, 10);
    return await this.userRepository.create({
      ...data,
      password: hashedPassword
    });
  }
}

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string, data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Promise<User> {
    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) throw new Error("Email already in use");
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return await this.userRepository.update(id, data);
  }
}

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}
  async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
