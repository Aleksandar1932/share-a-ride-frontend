import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Divider,
  Text,
  Link,
  Flex,
  Center,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import "react-date-picker/dist/DatePicker.css";

import { Header, Footer } from "@components";

const Offered: React.FC = () => {
  const [trips, setTrips] = useState(null);
  const fetchOffered = async () => {
    const response = await fetch(
      process.env.BACKEND_URL + "/api/trip/my/offered",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: localStorage.getItem("jwt").replace('"', ""),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      }
    );
    let trips = await response.json();
    setTrips(trips);
  };

  const performCancel = async (tripId) => {
    const response = await fetch(process.env.BACKEND_URL + "/api/trip/cancel", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("jwt").replace('"', ""),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        username: localStorage.getItem("username"),
        tripId: tripId,
      }), // body data type must match "Content-Type" header
    });
  };

  useEffect(() => {
    fetchOffered();
  }, []);
  return (
    <>
      <Header />
      <Center>
        <Heading size="xl">Your Offered Trips</Heading>
      </Center>
      <Center>
        <Box
          width="60%"
          border="2px"
          borderColor="gray.200"
          p={10}
          borderRadius="md"
        >
          {trips &&
            trips.map((trip) => {
              return (
                <>
                  <Flex
                    border="2px"
                    borderColor="gray.200"
                    mb={2}
                    borderRadius="md"
                  >
                    <Box borderRadius="md" color="grey" px={4}>
                      <Text>Origin: {trip["origin"]["name"]}</Text>
                      <Text>Destination: {trip["destination"]["name"]}</Text>
                      <Text>Price: {trip["price"]}</Text>
                      <Text>Offered Seats: {trip["offeredSeats"]}</Text>
                      <Text>Driver: {trip["driver"]["username"]}</Text>
                      <Link>Meeting Place</Link>
                    </Box>
                    <Spacer></Spacer>
                    <Box alignItems="right">
                      <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => {
                          performCancel(trip["id"]);
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Flex>
                  <Divider />
                </>
              );
            })}
        </Box>
      </Center>
      <Footer />
    </>
  );
};

export default Offered;
