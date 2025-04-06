import Head from 'next/head'
import { Center, Flex, Text} from '@chakra-ui/react'

export default function Home(){
  return(
    <>
      <Head>
        <title>CorteVip - Seu sistema completo</title>
      </Head>
      <Flex background="barber.900" height="100vh" alignItems="center" justifyContent="center">
        <Text fontSize={30}>Página home</Text>
        </Flex>
    </>
  )
}