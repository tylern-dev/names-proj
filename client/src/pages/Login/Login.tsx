import React, { useState, ChangeEvent, useEffect } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useAuthContext } from '../../hooks/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { loginWithEmailPassword } from '../../authentication/login-password'

// TODO: add nprogress.js for the loading bar at the top

interface FormValues {
  email: string
  password: string
}

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  })
  const { isAuthenticated, handleSetIsAuthenticated, loading } =
    useAuthContext()
  const navigate = useNavigate()
  const bg = useColorModeValue('gray.50', 'gray.800')
  const boxBg = useColorModeValue('white', 'gray.700')

  const handleLogin = () => {
    loginWithEmailPassword({
      email: formValues.email,
      password: formValues.password,
    }).then((response) => {
      if (response?.status === 200) {
        if (rememberMe) {
          const email = formValues.email
          localStorage.setItem('email', JSON.stringify(email))
        }
        handleSetIsAuthenticated()
        navigate('/dashboard')
      }
    })
  }

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  // const rememberedEmail = JSON.parse(localStorage.getItem('email') || '')
  // useEffect(() => {
  //   console.log(JSON.parse(localStorage.getItem('email') || ''))
  //   if (rememberedEmail && !formValues.email) {
  //     setRememberMe(true)
  //     setFormValues({ ...formValues, email: rememberedEmail })
  //   }
  // }, [rememberedEmail, formValues])

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <Flex minH={'100%'} align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={boxBg} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleFormChange}
                value={formValues.email}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                onChange={handleFormChange}
                value={formValues.password}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}>
                  Remember me
                </Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                isLoading={loading}
                onClick={() => handleLogin()}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
