export type UserRole = 'ADMIN' | 'USER';
export interface User {
    id: string;
    email: string;
    password?: string;
    name: string;
    role: UserRole;
    createdAt?: Date;
    updatedAt?: Date;
}
//# sourceMappingURL=User.d.ts.map