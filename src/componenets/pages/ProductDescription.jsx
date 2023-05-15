import { Box } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { AppContext } from '../../main'

export default function ProductDescription() {
    const {productSelected} = useContext(AppContext);
  return (
    <Box>
        {productSelected.farmer}
    </Box>
  )
}
