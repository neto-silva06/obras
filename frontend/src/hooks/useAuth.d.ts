import React from 'react';
interface AuthContextType {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user: any) => void;
    logout: () => void;
}
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: () => AuthContextType;
export {};
//# sourceMappingURL=useAuth.d.ts.map