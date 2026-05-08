import bcrypt from "bcryptjs";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { User } from "../../domain/entities/User";

export class RegisterUser {
  constructor(private userRepository: UserRepository) {}

  async execute(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists with this email");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }
}
