import { productsApi } from "../../api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

const returnUserToken = (data: AuthResponse): { user: User, token: string } => {
    const { token, ...user } = data;
    return {
        user,
        token
    }
}

export const authLogin = async (email: string, password: string) => {
    email = email.toLocaleLowerCase();
    try {
        const {data } = await productsApi.post<AuthResponse>('/auth/login', { email, password });
        console.log("🚀 ~ authLogin ~ data:", data)
        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        // throw new Error("Error en el login");
        return null;
    }
}

export const authCheckStatus = async () => {
    try {
        const {data} = await productsApi.get<AuthResponse>('/auth/check-status');
        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        return null;    
    }
}

//TODO: Hacer el register