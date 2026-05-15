import { prisma } from "../database/prisma.js";
export class PrismaUserRepository {
    async findByEmail(email) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user ? user : null;
    }
    async findById(id) {
        const user = await prisma.user.findUnique({ where: { id } });
        return user ? user : null;
    }
    async list() {
        const users = await prisma.user.findMany({
            orderBy: { name: 'asc' }
        });
        return users;
    }
    async create(data) {
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                role: data.role,
            },
        });
        return user;
    }
    async update(id, data) {
        const user = await prisma.user.update({
            where: { id },
            data: {
                ...(data.email ? { email: data.email } : {}),
                ...(data.name ? { name: data.name } : {}),
                ...(data.role ? { role: data.role } : {}),
                ...(data.password ? { password: data.password } : {}),
            },
        });
        return user;
    }
    async delete(id) {
        await prisma.user.delete({ where: { id } });
    }
}
//# sourceMappingURL=PrismaUserRepository.js.map