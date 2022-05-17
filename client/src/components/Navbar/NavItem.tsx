import { Flex, Icon, Link, FlexProps } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

interface NavItemProps extends FlexProps {
  icon: IconType
  to: string
  onClick: () => void
  children: ReactNode
}

const NavItem = ({ icon, to, onClick, children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      onClick={() => onClick()}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default NavItem
