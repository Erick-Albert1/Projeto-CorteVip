import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Button,
    Flex,
  } from '@chakra-ui/react'
  
  import { FiUser, FiScissors } from 'react-icons/fi'
  import { FaMoneyBillAlt } from 'react-icons/fa'
  import { ScheduleItem } from '../../pages/dashboard'
  
  interface ModalInfoProps{
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: ScheduleItem;
    finishService: () => Promise<void>;
  }
  
  export function ModalInfo({ isOpen, onOpen, onClose, data, finishService  }:ModalInfoProps){
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent color="white" bg="barber.400">
          <ModalHeader>Próximo</ModalHeader>
          <ModalCloseButton/>
  
          <ModalBody>
            <Flex align="center" mb={3}>
                <FiUser size={28} color='#ffb13e'/>
              <Text ml={3} fontSize="2xl" fontWeight="bold" >{data?.customer}</Text>
            </Flex>
            <Flex align="center" mb={3}>
                <FiScissors size={28} color='#fff'/>
              <Text ml={3} fontSize="large" fontWeight="bold" >{data?.haircut?.name}</Text>
            </Flex>
            <Flex align="center" mb={3}>
                <FaMoneyBillAlt size={28} color='#46ef75'/>
              <Text ml={3} fontSize="large" fontWeight="bold" >R$ {data?.haircut?.price}</Text>
            </Flex>

            <ModalFooter>
                <Button  
                bg="button.cta"
                _hover={{bg:'#ffb13e'}}
                color="#fff"
                mr={3}
                onClick={()=> finishService()}
                >
                    Finalizar serviço
                </Button>
            </ModalFooter>
          </ModalBody>
  
        </ModalContent>
      </Modal>
    )
  }