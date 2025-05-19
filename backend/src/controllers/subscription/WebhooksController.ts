import { Request, Response } from "express";
import Stripe from "stripe";
import { stripe } from "../../utils/stripe";

import { saveSubscription } from "../../utils/manageSubscription";


class WebhooksController{
    async handle(request: Request, response:Response){
        let event: Stripe.Event = request.body;

        
        let endpointSecret :  'whsec_...';

        if(endpointSecret){
        const signature = request.headers['stripe-signature']
        try{

            event = stripe.webhooks.constructEvent(
                request.body, 
                signature, 
                endpointSecret)
        }catch(err){
           console.log('webhook signature failed', err.message)
            return response.sendStatus(400);
        }
    }
        

        switch(event.type){
            case 'customer.subscription.deleted':
                //caso ele cancele sua assinatura vamos deletar a assinatura dele
                const payment = event.data.object as Stripe.Subscription;

                await saveSubscription(
                    payment.id,
                    payment.customer.toString(),
                    false,
                    true
                )

                break;
            case 'customer.subscription.updated':
                    //caso tenha alguma atualização na assinatura
                    const paymentIntent = event.data.object as Stripe.Subscription;
                    await saveSubscription(
                        paymentIntent.id,
                        paymentIntent.customer.toString(),
                        false
                    )
                    break;
            case 'checkout.session.completed':
                //criar a assinatura pois foi pago com sucesso
                const CheckoutSession = event.data.object as Stripe.Checkout.Session;

                await saveSubscription(
                    CheckoutSession.subscription.toString(),
                    CheckoutSession.customer.toString(),
                    true,
                )
            break;
            default:
                console.log(`Evento não conhecido ${event.type}`)
        }

        response.send();
    }
}
export {WebhooksController}