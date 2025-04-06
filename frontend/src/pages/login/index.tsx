import Head from 'next/head'
import Image from 'next/image';
import logoImg from '../../../public/images/corte.png'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'

import Link from 'next/link';
export default function Login(){
  return(
    <>
      <Head>
        <title>CorteVip - Faça login para axessar</title>
      </Head>
      <Flex   background="barber.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4}>
                <Image
                src={logoImg}
                quality={100}
                objectFit='fill'
                alt='Logo CorteVip'
                />
            </Center>


                <Input
                textColor="button.default"
                background="barber.400"
                variant="filled"
                size="lg"
                placeholder='email@email.com'
                type='email'
                marginBottom={3}
                />
                <Input
                textColor="button.default"
                background="barber.400"
                variant="filled"
                size="lg"
                placeholder='*********'
                type='text'
                marginBottom={6}
                
                />

                <Button
                background="button.cta"
                mb={6}
                color="gray.900"
                size="lg"
                _hover={{bg:"#ffb13e"}}
                >
                    Acessar
                </Button>

                <Center mt={2}>
                    <Link  href="/register">
                    <Text
                    textColor="button.default"
                    >Ainda não possui conta? <strong>Cadastre-se</strong></Text>
                    </Link>
                </Center>
        </Flex>
        </Flex>
    </>
  )
}