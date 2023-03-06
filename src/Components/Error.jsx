import { Alert, AlertIcon } from "@chakra-ui/react";

const Error = ({ message }) => {
  return (
    <>
      <Alert
        status="Error"
        position={"fixed"}
        bottom={"4"}
        left={"50%"}
        translateX={"translate(-50%)"}
        w={"container.lg"}
      >
        <AlertIcon />
        {message}
      </Alert>
    </>
  );
};

export default Error;
