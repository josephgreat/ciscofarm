import { Box, Flex, Heading, Link } from '@chakra-ui/react'
import React from 'react'

export default function SideNav() {
  return (
    <Flex as='nav'>
      <Box><Heading>Cisco Farm</Heading></Box>
      <Flex>
        <Link>Overview</Link>
        <Link>My Cart</Link>
        <Link>My Products</Link>
      </Flex>
      <Flex>
        <Link>Settings</Link>
        <Link>Log Out</Link>
      </Flex>
    </Flex>  
    )
}
