import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { UserRepository } from "../../domain/repositories/UserRepository.js";

export class LoginUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: any): Promise<{ user: any, token: string }> {
    const normalizedEmail = email.trim().toLowerCase();

    console.log(`[LoginAttempt] Email: ${normalizedEmail}`);

    const user = await this.userRepository.findByEmail(normalizedEmail);

    if (!user) {
      console.log(`[LoginFailed] User not found for email: ${normalizedEmail}`);
      throw new Error("Verifique suas credenciais.");
    }

    let isPasswordValid = false;
    try {
      // Try comparing with bcrypt first
      isPasswordValid = await bcrypt.compare(password, user.password!);
      if (isPasswordValid) console.log(`[LoginSuccess] Bcrypt verification passed for user: ${user.id}`);
    } catch (e) {
      // If the stored password is not a valid hash, bcrypt.compare might throw
      console.log(`[LoginDebug] Bcrypt threw an error, likely plain text password`);
      isPasswordValid = false;
    }

    // Fallback for legacy plain-text passwords
    if (!isPasswordValid && password === user.password) {
      isPasswordValid = true;
      console.log(`[LoginSuccess] Plain-text fallback matched. Migrating user ${user.id} to bcrypt...`);

      // Auto-migrate to hashed password
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.userRepository.update(user.id, { password: hashedPassword });
      console.log(`[LoginMigration] User ${user.id} migrated successfully.`);
    }

    if (!isPasswordValid) {
      console.log(`[LoginFailed] Password mismatch for user: ${user.id}`);
      throw new Error("Verifique suas credenciais.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: "1d" });
    const { password: _, ...userResponse } = user;
    return { user: userResponse, token };
  }
}
