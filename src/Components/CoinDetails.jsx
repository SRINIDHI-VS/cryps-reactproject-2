import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import axios from "axios";
import Error from "./Error";
import { server } from "../index";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [shimmer, setShimmer] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, SetchartArray] = useState([]);
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const params = useParams();

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setShimmer(true);
        break;
      case "7d":
        setDays("7d");
        setShimmer(true);
        break;
      case "14d":
        setDays("14d");
        setShimmer(true);
        break;
      case "30d":
        setDays("30d");
        setShimmer(true);
        break;
      case "60d":
        setDays("60d");
        setShimmer(true);
        break;
      case "200d":
        setDays("200d");
        setShimmer(true);
        break;
      case "1y":
        setDays("365d");
        setShimmer(true);
        break;
      case "max":
        setDays("max");
        setShimmer(true);
        break;

      default:
        setDays("24h");
        setShimmer(true);
        break;
    }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: charData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setCoin(data);
        SetchartArray(charData.prices);
        setShimmer(false);
      } catch (error) {
        setError(true);
        setShimmer(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) {
    return (
      <>
        <Error message={"Error while fecthing the data..."} />
      </>
    );
  }

  return (
    <Container maxW={"container.xl"}>
      {shimmer ? (
        <Shimmer />
      ) : (
        <>
          <Box borderWidth={1} width={"full"}>
            {<Chart arr={chartArray} currency={currencySymbol} days={days} />}
          </Box>

          <HStack p="4" overflowX={"auto"}>
            {btns.map((i) => (
              <Button
                disabled={days === i}
                key={i}
                onClick={() => switchChartStats(i)}
              >
                {i}
              </Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"flex-start"} opacity={0.7}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={"2xl"}
              bgColor={"blackAlpha.800"}
              color={"white"}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />
              <Item
                title={"Market Capital"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const Item = ({ title, value }) => {
  return (
    <>
      <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
        <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
          {title}
        </Text>
        <Text>{value}</Text>
      </HStack>
    </>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <>
      <VStack w={"full"}>
        <Progress value={50} colorScheme={"teal"} w={"full"} />
        <HStack justifyContent={"space-between"} w={"full"}>
          <Badge children={low} colorScheme={"red"} />
          <Text fontSize={"sm"}>24H Range</Text>
          <Badge children={high} colorScheme={"green"} />
          <Text></Text>
        </HStack>
      </VStack>
    </>
  );
};

export default CoinDetails;
