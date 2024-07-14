import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import toast from "react-hot-toast";

// Define os tipos para o contexto de autenticação
interface AuthContextProps {
    signed: boolean;
    user: any;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    id: user.uid,
                    email: user.email,
                };
                setUser(userData);
                localStorage.setItem("@user", JSON.stringify(userData));
            } else {
                setUser(null);
                localStorage.removeItem("@user");
            }
        });
        return () => unsubscribe();
    }, []);
    

    const login = async (email: string, password: string) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = {
                id: userCredentials.user?.uid,
                email: userCredentials.user?.email,
            };
            setUser(user);
            localStorage.setItem("@user", JSON.stringify(user));
            
        } catch (error) {
            toast.error('Erro ao fazer login. Verifique suas credenciais.');
            throw error;
        }
    };

    const register = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Usuário cadastrado com sucesso!');
        } catch (error) {
            toast.error('Erro ao registrar usuário.');
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("@user");
            toast.success('Usuário deslogado com sucesso!');
        } catch (error) {
            toast.error('Erro ao deslogar usuário.');
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ signed: !!user, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth deve ser usado dentro de um AuthProvider");
//     }
//     return context;
// }
