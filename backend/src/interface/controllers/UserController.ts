import type { Request, Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository.js";
import { ListUsers, CreateUser, UpdateUser, DeleteUser } from "../../application/use-cases/UserUseCases.js";

const userRepository = new PrismaUserRepository();
const listUsers = new ListUsers(userRepository);
const createUser = new CreateUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

export class UserController {
  async index(req: Request, res: Response) {
    return res.json(await listUsers.execute());
  }

  async store(req: Request, res: Response) {
    try {
      return res.status(201).json(await createUser.execute(req.body));
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID is required" });
    try {
      return res.json(await updateUser.execute(id, req.body));
    } catch (e: any) {
      return res.status(400).json({ message: e.message });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "User ID is required" });
    await deleteUser.execute(id);
    return res.status(204).send();
  }
}
