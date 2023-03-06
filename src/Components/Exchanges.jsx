import axios from "axios";
import { HStack } from "@chakra-ui/react";
import { server } from "../index";
import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import Shimmer from "./Shimmer";
import Error from "./Error";
import ExchangeCard from "./ExchangeCard";

const Exchanges = () => {
  let [exchanges, setExchnages] = useState([]);
  let [shimmer, setShimmer] = useState(true);
  let [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchnages(data);
        setShimmer(false);
      } catch (error) {
        setError(true);
        setShimmer(false);
      }
    };
    fetchExchange();
  }, []);

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
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
export default Exchanges;
