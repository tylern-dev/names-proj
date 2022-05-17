import { useAuthContext } from 'src/hooks/AuthProvider'
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'

interface MobileProps extends FlexProps {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { handleSignOut, isAuthenticated } = useAuthContext()

  const bgColor = useColorModeValue('white', 'gray.900')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Flex
      ml={{ base: 0, md: isAuthenticated ? 60 : 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{
        base: 'space-between',
        md: isAuthenticated ? 'flex-end' : 'none',
      }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{
          base: isAuthenticated ? 'flex' : 'none',
          md: isAuthenticated ? 'none' : 'flex',
        }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      {isAuthenticated && (
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />

          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    display={{ base: 'flex', md: 'none' }}
                    size={'sm'}
                    name="Tyler Negro"
                    // src={
                    //   'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    // }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">Tyler Negro</Text>
                    <Text fontSize="xs" color="brand.100">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg={bgColor} borderColor={borderColor}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleSignOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      )}
    </Flex>
  )
}

export default MobileNav
