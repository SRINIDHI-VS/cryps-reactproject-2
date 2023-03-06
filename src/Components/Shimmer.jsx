import { VStack, Box, Spinner } from "@chakra-ui/react";

const Shimmer = () => {
  return (
    <>
      <VStack h="90vh" justifyContent={"center"}>
        <Box transform={"scale(3)"}>
          <Spinner size={"xl"} />
        </Box>
      </VStack>
    </>
  );
};

export default Shimmer;
