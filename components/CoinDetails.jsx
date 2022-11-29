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
  Badge,
  StatHelpText,
  StatArrow,
  Stat,
  Progress,
  Box,
  Switch,
} from "@chakra-ui/react";
import Loader from "./Loader";
import CoinCard from "./CoinCard";
import { useParams } from "react-router-dom";
import Chart1 from "./Chart1";

const CoinDetails = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartArray, setChartArray] = useState([]);
  const [days, setDays] = useState("24h");

  const btn = ["24h", "7d", "14d", "30d", "60d", "365d", "max"];
  const changeChartTime = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "365d":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;
      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };

  const params = useParams();

  const btnArr = new Array(132).fill(1);

  const getData = async () => {
    const { data } = await axios.get(`${server}/coins/${params.id}`);
    const { data: chartData } = await axios.get(
      `${server}/coins/${params.id}/market_chart?vs_currency=inr&days=${days}`
    );
    setCoins(data);
    setChartArray(chartData.prices);
    // console.log(chartData.prices);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [params.id,days]);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Text
            fontSize={"small"}
            textAlign="end"
            opactity="0.7"
            p="2"
            
          >
            Last Updated on {Date(coins.market_data.last_updated).split("G")[0]}
          </Text>

          <Box 
          background
          width={"full"} borderWidth={3}
          h={["auto","70vh"]}
          >
            
            <Chart1 
          objectFit="contain"
            array={chartArray} currency={"₹"} days={days} />
          </Box>

          <HStack
           p="4"
            overflowX={"auto"}

            >
            {btn.map((val) => {
              return (
                <Button disabled={days === val} key={val} onClick={() => changeChartTime(val)}> {val}</Button>
              );
            })}
          </HStack>

          <VStack
            // backgroundColor={"black"}
            w={"full"}
            h="full"
            shadow={"lg"}
            p={"4"}
            borderRadius={"lg"}
            transition={"all 0.3s"}
            m={"2"}
          >
            <Image
              src={coins.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
              alt={"Exchange"}
            />
            <Heading size={"md"}  noOfLines={1}>
              {coins.id} <br />
            </Heading>

            <Stat>
              <StatHelpText >
                <StatArrow
                  type={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                  color={
                    coins.market_data.price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }
                />
                {coins.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Text  fontSize="3xl">
              ₹{coins.market_data.current_price.inr} <br />
              <Badge fontSize="2xl">
                {" "}
                #{coins.market_data.market_cap_rank}
              </Badge>
            </Text>

            <CustomBar
              high={`₹${coins.market_data.high_24h.inr}`}
              low={`₹${coins.market_data.low_24h.inr}`}
            />

            <Box w={"full"} p="4" >
              <Item title={"Max Supply"} value={coins.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coins.market_data.circulating_supply}
              />
              <Item
                title={"Market Cap"}
                value={`${coins.market_data.market_cap.inr}`}
              />
              <Item
                title={"All Time Low"}
                value= {` ₹${coins.market_data.atl.inr}`}
              />
              <Item
                title={"All Time High"}
                value={`₹${coins.market_data.ath.inr}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack  justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

export default CoinDetails;
