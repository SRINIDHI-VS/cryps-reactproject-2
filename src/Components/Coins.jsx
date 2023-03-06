import axios from "axios";
import { HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { server } from "../index";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Shimmer from "./Shimmer";
import Error from "./Error";
import CoinCard from "./CoinCard";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [shimmer, setShimmer] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setShimmer(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setShimmer(false);
      } catch (error) {
        setError(true);
        setShimmer(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

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
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"eur"}>EUR</Radio>
              <Radio value={"usd"}>USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((i) => (
              <CoinCard
                key={i.id}
                name={i.name}
                img={i.image}
                price={i.current_price}
                symbol={i.symbol}
                id={i.id}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((item, index) => (
              <Button
                onClick={() => changePage(index + 1)}
                bgColor={"blackAlpha.900"}
                color={"white"}
                key={index}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Coins;
