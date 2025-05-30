import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react' 

import { extendTheme } from '@chakra-ui/react'

import { AuthProvider } from '@/context/AuthContex'
import { color } from 'framer-motion'

const styles = {
  global:{
    body:{
      color: 'gray-100'
    },
      a:{
        color: '#fff'
      }
    
  }
}

const colors = {
  barber:{
    900: '#12131b',
    400: '#1b1c29',
    100: '#c6c6c6'
  },
  button:{
    cta: '#fba931',
    default: '#fff',
    gray:'#dfdfdf',
    danger:'#ff4040'
  },
  orange:{
    900: '#fba931'
  }
}

const theme = extendTheme({ styles, colors })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
  <AuthProvider>
  <Component {...pageProps} />
  </AuthProvider>
  </ChakraProvider>
  )
}

export default MyApp
