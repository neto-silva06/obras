import type { Request, Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { LoginUser } from "../../application/use-cases/LoginUser.js";
import { RegisterUser } from "../../application/use-cases/RegisterUser.js";

const userRepository = new PrismaUserRepository();

export class AuthController {
  async register(req: Request, res: Response) {
    try {
      const user = await new RegisterUser(userRepository).execute(req.body);
      const { password, ...userResponse } = user;
      return res.status(201).json({ user: userResponse });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { user, token } = await new LoginUser(userRepository).execute(req.body);
      return res.json({ user, token });
    } catch (error: any) {
      return res.status(401).json({ error: error.message });
    }
  }
}
