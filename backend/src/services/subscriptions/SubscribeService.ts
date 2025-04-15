import prismaClient from "../../prisma";
import Stripe from "stripe";

interface SubscribeRequest{
    user_id: string;
}

class SubscribeService{
    async execute({ user_id}: SubscribeRequest){
       
        const stripe = new Stripe(
            process.env.STRIPE_API_KEY,
            {
                apiVersion: '2025-03-31.basil',
                appInfo:{
                    name: 'CorteVip',
                    version: '1'
                }
            }
        )


        //buscar o usuário e cadastrar ele no stripe, caso não tenha cadastrado.
        const findUser = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })
        let customerId = findUser.stripe_customer_id

        if( !customerId){
            //caso nao tenha criamos como cliente no stripe
            const stripeCostumer = await stripe.customers.create({
                email: findUser.email
            })
            await prismaClient.user.update({
                where:{
                    id: user_id
                },
                data:{
                    stripe_customer_id: stripeCostumer.id
                }
            })

            customerId = stripeCostumer.id
        }

        // inicializar o nosso checkout de pagamento
        const stripeCheckoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types:['card'],
            billing_address_collection: 'required',
            line_items: [
                {price: process.env.STRIPE_PRICE, quantity: 1}
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCCESS_URL,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return {sessionId: stripeCheckoutSession.id }


    }
}
export {SubscribeService}