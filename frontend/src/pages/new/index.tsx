import { useState, ChangeEvent } from 'react'
import Head from "next/head"
import { Sidebar } from "../../components/sidebar"

import { 
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Select
} from '@chakra-ui/react'

import { canSSRAuth } from '@/utils/canSSRAuth'
import { setupAPIClient } from '@/services/api'
import { useRouter } from 'next/router'

interface HaircutProps{
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps{
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps){

  const [customer, setCustomer] = useState('')
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0])
  const router = useRouter();

  function handleChangeSelect(id: string){

    const haircutItem = haircuts.find(item => item.id === id)

    setHaircutSelected(haircutItem)
  }

  async function handleRegister(){
    if(customer === ''){
      alert('Preencha o nome')
      return;
    }
    try{
      const apiClient = setupAPIClient();
      await apiClient.post('/schedule', {
        customer: customer,
        haircut_id: haircutSelected?.id
      })
      router.push('/dashboard')


    }catch(err){
      console.log(err)
      alert('erro ao registrar')
    }
  }

  return(
    <>
      <Head>
        <title>CorteVIP - Novo agendamento</title>
      </Head>
      <Sidebar>
        <Flex color="white" direction="column" align="flex-start" justify="flex-start">
          <Flex
            direction="row"
            w="100%"
            align="center"
            justify="flex-start"
          >
            <Heading fontSize="3xl" mt={4} mb={4} mr={4}>
              Novo corte
            </Heading>
          </Flex>

          <Flex 
            maxW="700px"
            pt={8}
            pb={8}
            width="100%"
            direction="column"
            align="center"
            justify="center"
            bg="barber.400"
          >
            <Input
              placeholder="Nome do cliente"
              w="85%"
              mb={3}
              size="lg"
              type="text"
              bg="barber.900"
              value={customer}
              onChange={ (e: ChangeEvent<HTMLInputElement>) => setCustomer(e.target.value) }
            />

            <Select color="black" bg="white" mb={3} size="lg" w="85%" onChange={(e)=> handleChangeSelect(e.target.value)}>
              {haircuts?.map( item => (
                <option key={item?.id} value={item?.id}>{item?.name}</option>
              ))}
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: '#FFb13e' }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>

          </Flex>

        </Flex>
      </Sidebar>
    </>
  )
}
export const getServerSideProps = canSSRAuth(async (ctx) =>{
    try{
        const apiClient = setupAPIClient(ctx);
        const response = await apiClient.get('/haircuts',{
            params:{
                status: true,
            }
        })
        if(response.data === null){
            return{
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        return{
            props:{
                haircuts: response.data
            }
        }
    }catch(err){
        console.log(err)
        return{
            redirect:{
                destination: '/dashboard',
                permanent: false
            }
        }
    }
})