import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserLayout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import Modal from "../../Modal";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from "../../../firebase";
import ProductCard from "./ProductCard";

const db = getFirestore(app);
let allProducts = [];
export default function Products() {
  let { currentTitle, setOpenModal, userDetails } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const productsQuery = query(
        collection(db, "products"),
        where("uid", '==', userDetails.uid)
      );
      const usersProducts = await getDocs(productsQuery);
      usersProducts.forEach((userProduct) => {
        if (userProduct.exists()) {
          setProducts([...products, userProduct.data()]);
          allProducts.push(userProduct.data())
        }
      });
    console.log(allProducts);

  }

  useEffect(() => {
    getProducts();
    console.log(products);
  }, [...allProducts])

  return (
    <Box>
      <Button onClick={() => setOpenModal({type: "product", value: true})}>Add Product</Button>
      <Flex gap={"4"} my="8">
        {products != [] && products.map((product, index) => (
          <ProductCard currentProduct={product} key={index} />
        ))}
      </Flex>
    </Box>
  );
}

export const NewProduct = () => {
  let initialProductDetails = {
    product: "",
    price: "",
    description: "",
    stock: 0,
  };
  const toast = useToast();
  let { userDetails, setOpenModal } = useContext(UserContext);
  const [productDetails, setProductDetails] = useState(initialProductDetails);
  const updateProductDetails = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const productRef = await addDoc(collection(db, "products"), {
      ...productDetails,
      uid: userDetails.uid,
    });
    if (productRef.id) {
      toast({ description: "Product added", status: "success" });
      setOpenModal({type: "", value: false});
      allProducts.push(productDetails)
    }
    console.log(allProducts);
  };
  return (
    <Box>
      <Heading as="h3" textAlign={"center"} mb="8">
        New Product
      </Heading>
      <form onSubmit={(e) => createProduct(e)}>
        <FormControl mb="6">
          <FormLabel htmlFor="product">Product</FormLabel>
          <Input
            type="text"
            name="product"
            id="product"
            onInput={updateProductDetails}
          />
        </FormControl>
        <FormControl mb="6">
          <FormLabel htmlFor="price">Price</FormLabel>
          <InputGroup>
            <InputLeftAddon>&#8358;</InputLeftAddon>
            <Input
              type="number"
              name="price"
              id="price"
              onInput={updateProductDetails}
            />
          </InputGroup>
        </FormControl>
        <FormControl mb="6">
          <FormLabel htmlFor="stock">Availiable quantity</FormLabel>
          <Input
            type="number"
            name="stock"
            id="stock"
            onInput={updateProductDetails}
          />
        </FormControl>
       
        <FormControl mb="6">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea
            id="description"
            placeholder="This product contains ..."
            name="description"
            onInput={updateProductDetails}
          />
        </FormControl>
      
        <Button type="submit">Add</Button>
      </form>
    </Box>
  );
};
