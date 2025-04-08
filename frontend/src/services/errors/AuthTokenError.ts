export class AuthTokenError extends Error{
    constructor(){
        super('Erro com a autenticação de token')
    }
}