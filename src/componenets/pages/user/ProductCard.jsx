import { Box, Flex, Heading, Img, Text } from '@chakra-ui/react'
import React from 'react'

export default function ProductCard({currentProduct}) {
    let {description, product, img, stock, price} = currentProduct;
  return (
    <Box as='figure' bg={"gray.100"} px={"5"} py={"3"} borderRadius={"2rem"}>
        <Box><Img src={img} /></Box>
        <Flex as='figcaption' gap="2" mt="4" flexDir={"column"}>
            <Heading as="h4"  fontSize={"1.3rem"}>{product}</Heading>
            <Text>N{price}</Text>
            <Text>Available Stock: {stock}</Text>
        </Flex>
    </Box>
  )
}
