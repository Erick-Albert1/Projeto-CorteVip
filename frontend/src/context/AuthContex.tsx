import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/services/apiClient";

interface AuthContextData{
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps)=> Promise<void>;
    signUp: (credentials: SignUpProps)=> Promise<void>;
    logoutUser: ()=> Promise<void>;
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
interface SignUpProps{
    name: string;
    email: string;
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    console.log('erro logout');
    try{
        destroyCookie(null, '@corte.token', {path: '/'})
        Router.push('/login');
    }catch(err){
        console.log('erro ao sair')
    }
}

export function AuthProvider({children}: AuthProviderProps){

    const [user, setuser] = useState<UserProps>()
    const isAuthenticated =  !!user;//boa sacada pra converter o valor pra boleano.
    
    async function signIn({email, password}: SignInProps){
      try{
        const response = await api.post('/session', {
            email,
            password
        })
        const { id, name, token, subscriptions, endereco}= response.data;

        setCookie(undefined, '@corte.token', token, {
            maxAge:60 * 60 * 24 * 30, // expirar em um mês
            path: '/'
        })
        setuser({
            id,
            name,
            email,
            endereco,
            subscriptions
        })

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        Router.push('/dashboard')

      }catch(err){
        console.log('erro ao entrar', err)
      }
    }

    async function signUp({name, email, password}: SignUpProps){
        try{
            const response = await api.post('/users',{
                name,
                email,
                password
            })

            Router.push('/login')
        }catch(err){
            console.log(err);
        }
    }

    async function logoutUser(){
        try{
            destroyCookie(null, '@corte.token', {path: '/'})
            Router.push('/login')
            setuser(null);
        }catch(err){
 console.log('Erro ao sair', err)
        }
    }
    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            signIn,
            signUp,
            logoutUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}