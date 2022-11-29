import { Box, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btc from "../assets/btc.png"
import {motion} from "framer-motion"

const Home = () => {
  return (
    <Box w={"full"}
    h="85vh"
    >
       <motion.div
       style={{
        height:"80vh",
       }}
       animate={{
        translateY:"20px"
       }}
       transition={{
        duration:"2",
        repeat:"Infinity",
        repeatType:"reverse"
       }}
       >
      <Image
      filter={"grayscale(1)"}
      w="full"
      h="full"
      objectFit={"contain"}
       src={btc}/>

       </motion.div>
       
    </Box>
  )
}

export default Home