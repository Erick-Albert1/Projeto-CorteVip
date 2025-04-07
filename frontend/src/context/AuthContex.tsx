import { createContext, ReactNode, useState } from "react";

interface AuthContextData{
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps)=> Promise<void>;
}
interface UserProps{
    id: string;
    name: string;
    email: string;
    endereco: string | null;
    subscriptions?: SubscriptionProps | null;
}
interface SubscriptionProps{
    id: string;
    status: string
}
type AuthProviderProps ={
    children: ReactNode;
}
interface SignInProps{
    email: string;
    password:string
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps){

    const [user, setuser] = useState<UserProps>()
    const isAuthenticated =  !!user;//boa sacada pra converter o valor pra boleano.
    
    async function signIn({email, password}: SignInProps){
        console.log({
            email,
            password
        })
    }
    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}