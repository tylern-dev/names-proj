import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react'
import { FiHome, FiTrendingUp, FiCompass, FiStar } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import MobileNav from './MobileNav'
import NavItem from './NavItem'

interface LinkItemProps {
  name: string
  to: string
  icon: IconType
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, to: '/dashboard' },
  { name: 'Trending', icon: FiTrendingUp, to: '/' },
  { name: 'Explore', icon: FiCompass, to: '/dashboard/name' },
  { name: 'Favorites', icon: FiStar, to: '/' },
  // { name: 'Settings', icon: FiSettings },
]

export default function Navbar({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean
  children: ReactNode
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      {isAuthenticated && (
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
      )}
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: isAuthenticated ? 60 : 0 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.to}
          onClick={onClose}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}
