import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";


class WebhooksController{
    async handle(request: Request, response:Response){
        let event: Stripe.Event = request.body;

        let endpointSecret: 'whsec_...'

        if(endpointSecret){
            const signature = request.headers['stripe-signature']
            try{

                event = stripe.webhooks.constructEvent(
                    request.body,
                    signature,
                    endpointSecret
                )
            }catch(err){
                console.log('webhook signature failed', err.message)
                return response.sendStatus(400);
            }
        }

        switch(event.type){
            case 'customer.subscription.deleted':
                //caso ele cancele sua assinatura vamos deletar a assinatura dele
                break;
            case 'customer.subscription.updated':
                    //caso tenha alguma atualização na assinatura
                    break;
            case 'checkout.session.completed':
                //criar a assinatura pois foi pago com sucesso
            break;
            default:
                console.log(`Evento desconhecido ${event.type}`)
        }

        response.send();
    }
}
export {WebhooksController}