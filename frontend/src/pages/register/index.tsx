import { useState, useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image';
import logoImg from '../../../public/images/corte.png'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'

import Link from 'next/link';
import { AuthContext } from '@/context/AuthContex';
export default function Register(){
  const { signUp} = useContext(AuthContext);

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister(){
        if(name === '' && email === '' && password === ''){
          return;
        }

        await signUp({
          name,
          email,
          password
        })

    }
  return(
    <>
      <Head>
        <title>Crie sua conta no CorteVip</title>
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
                placeholder='Nome da barbearia'
                type='text'
                marginBottom={3}
                value={name}
                onChange={(e)=> setName(e.target.value)}
                />
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
                onClick={handleRegister}
                background="button.cta"
                mb={6}
                color="gray.900"
                size="lg"
                _hover={{bg:"#ffb13e"}}
                >
                    Cadastrar
                </Button>

                <Center mt={2}>
                    <Link  href="/login">
                    <Text
                    textColor="button.default"
                    >Já possui conta? <strong>Faça login</strong></Text>
                    </Link>
                </Center>
        </Flex>
        </Flex>
    </>
  )
}