import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Loader from "./Loader";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();
  
  const onChangePage=(data)=>{
    setPage(data)
    setLoading(true);
  }
  
  const btnArr= new Array(132).fill(1);
  const getData = () => {
    axios.get(`${server}/coins/markets?vs_currency=inr&page=${page}`).then((res) => {
      setCoins(res.data);
      setLoading(false);
      // console.log(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, [loading, page]);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {coins.map((i) => (
            <CoinCard
              id={i.id}
              key={i.id}
              name={i.name}
              price={i.current_price}
              img={i.image}
              symbol={i.symbol}
            />
          ))}
        </HStack>
      )}

      <HStack w="full" overflowX={"auto"} justifyContent="space-evenly">

        {btnArr.map((item,index)=>{
          return(
            <Button  backgroundColor={"white"} color={"black"} onClick={()=>onChangePage(index)}>{index+1}</Button>
          )
        })}
      </HStack>
    </Container>
  );
};

export default Coins;
