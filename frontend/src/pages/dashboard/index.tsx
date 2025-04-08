import Head from 'next/head'
import { Flex, Text } from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth';
import { Sidebar } from '@/components/sidebar';



export default function Dashboard(){
    return(
        <>
        <Head>
            <title>CorteVip - minha barbearia</title>
        </Head>
        <Sidebar>
        <Flex>
            <Text>
                Bem vindo ao dashboard
            </Text>
        </Flex>
        </Sidebar>
        </>
    )
}
export const GetServerSideProps = canSSRAuth( async(ctx)=>{
    return{
        props:{
            
        }
    }
})

