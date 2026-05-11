import { prisma } from "../database/prisma.js";
export class PrismaUserRepository {
    async findByEmail(email) {
        return await prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return await prisma.user.findUnique({ where: { id } });
    }
    async create(data) {
        return await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
            },
        });
    }
}
//# sourceMappingURL=PrismaUserRepository.js.map