import { useState, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import logoImg from '../../../public/images/corte.png'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'

import Link from 'next/link';
import { AuthContext } from '../../context/AuthContex';

import { canSSRGuest } from '../../utils/canSSRGuest';
export default function Login(){

  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(){

    if(email === '' || password === ''){
      return;
    }
    await signIn({
      email,
      password,
    })
  }
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
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                <Input
                textColor="button.default"
                background="barber.400"
                variant="filled"
                size="lg"
                placeholder='*********'
                type='text'
                marginBottom={6}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                
                />

                <Button
                background="button.cta"
                mb={6}
                color="gray.900"
                size="lg"
                _hover={{bg:"#ffb13e"}}
                onClick={handleLogin}
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
export const getServerSideProps = canSSRGuest(async (ctx)=>{
return{
  props:{}
}
})