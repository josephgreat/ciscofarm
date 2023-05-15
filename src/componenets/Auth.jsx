import { Box, FormControl, FormLabel, Grid, Heading, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import React from 'react'

export default function Auth({is_new_user}) {
  const signUp = () => {
    return(
      <>
        <Heading as={"h3"}>Sign Up</Heading>
        <form>
          <FormControl>
            <FormLabel htmlFor='fname'>First Name</FormLabel>
            <Input type='text' name='fname' id='fname'></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='lname'>Last Name</FormLabel>
            <Input type='text' name='lname' id='lname'></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='uname'>Username</FormLabel>
            <Input type='text' name='uname' id='uname'></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='tel'>Phone Number</FormLabel>
            <Input type='tel' name='tel' id='tel'></Input>
          </FormControl>
        </form>
      </>
    )

  }
  const login = () => {
    return(
      <>
        <form>  
          <FormControl>
            <FormLabel htmlFor='uname'>Username</FormLabel>
            <Input type='text' name='uname' id='uname'></Input>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input type='password' name='password' id='password'></Input>
          </FormControl>
        </form>
      </>
    )

  }
  return (
    <Grid pos={'absolute'} placeItems={'center'} inset='0' bg={'rgba(0,0,0,.3)'}>
      <Box bg={'white'} px='10' py='10' borderRadius={'3rem'}>
      <Heading as={"h3"}>{is_new_user ? 'Sign Up' : 'Log In'}</Heading>

        {is_new_user ? signUp() : login()}
      </Box>
    </Grid>
  )
}
