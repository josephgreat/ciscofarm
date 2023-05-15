import {
  Card,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Stack,
  Text,
  Heading,
  HStack,
  Link,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AppContext } from "../main";
import { Link as RouteLink } from "react-router-dom";

export default function ProductCard({ product }) {
  const { farmer, price, goods, stock_left, imgUrl } = product;
  const {productSelected, setProductSelected} = useContext(AppContext)
  return (
    <Link  w={{ base: "90%", sm: "46%", md: "30%", lg: '23%' }}
    _hover={{ transform: "scale(1.1)" }}
    transition={"all .3s ease"}
    as={RouteLink}
    to='/product_description'
    onClick={() => setProductSelected(product)}>
    <Card
     
    >
      <CardBody>
        <Image
          src={imgUrl}
          alt="Green double couch with wooden legs"
          width={"100%"}
          h={"10rem"}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{goods}</Heading>
          <Text color="blue.600" fontSize="md">
            Farmer: {farmer}
          </Text>
          <HStack justifyContent={"space-between"}>
            <Text color="blue.600" fontSize="2xl">
              &#8358;{price}
            </Text>
            <Text>Stock Left: {stock_left}</Text>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
    
    </Link>
  );
}
