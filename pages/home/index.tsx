import React, { useEffect, useState } from "react";
import {
  Select,
  Heading,
  Stack,
  Input,
  InputGroup,
  Button,
  Box,
  Divider,
  Text,
  Link,
  SimpleGrid,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Center,
  Spacer,
} from "@chakra-ui/react";
import "react-date-picker/dist/DatePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

import { Header, Main, Cards, Footer } from "@components";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureTimeFrom, setDepartureTimeFrom] = useState(null);
  const [departureTimeTo, setDepartureTimeTo] = useState(null);
  const [price, setPrice] = useState(null);

  const [trips, setTrips] = useState(null);

  let BACKEND_URL = process.env.BACKEND_URL;
  const performSearch = async () => {
    const response = await fetch(BACKEND_URL + "/api/trip/search", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: localStorage.getItem("jwt").replace('"', ""),
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        destinationName: destination,
        originName: origin,
        departureTimeFrom: departureTimeFrom,
        departureTimeTo: departureTimeTo,
        price: price,
      }),
    });
    let trips = await response.json();
    setTrips(trips);
  };

  const performRegister = async (tripId) => {
    const response = await fetch(BACKEND_URL + "/api/trip/register", {
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

    setIsOpen(true);
    setTrips(null);
  };

  useEffect(() => {
    if (!isLoaded) {
      setCities([
        "Skopje",
        "Tetovo",
        "Bitola",
        "Vinica",
        "Češinovo",
        "Demir Kapija",
        "Radoviš",
        "Sopište",
        "Gradsko",
        "Vasilevo",
        "Kruševo",
        "Resen",
        "Zelenikovo",
        "Gevgelija",
        "Makedonska Kamenica",
        "Veles",
        "Sveti Nikole",
        "Novo Selo",
        "Pehčevo",
        "Plasnica",
        "Bogovinje",
        "Vevčani",
        "Karbinci",
        "Konče",
        "Kičevo",
        "Struga",
        "Kočani",
        "Rostuša",
        "Rosoman",
        "Tearce",
        "Kavadarci",
        "Staro Nagoričane",
        "Lozovo",
        "Brvenica",
        "Demir Hisar",
        "Prilep",
        "Bogdanci",
        "Strumica",
        "Kratovo",
        "Čučer-Sandevo",
        "Star Dojran",
        "Kriva Palanka",
        "Petrovec",
        "Aračinovo",
        "Bosilovo",
        "Makedonski Brod",
        "Probištip",
        "Rankovce",
        "Valandovo",
        "Vrapčište",
        "Lipkovo",
        "Dolneni",
        "Berovo",
        "Krivogaštani",
        "Negotino",
        "Ohrid",
        "Čaška",
        "Studeničani",
        "Štip",
        "Belčišta",
        "Novaci",
        "Mogila",
        "Delčevo",
        "Ilinden",
        "Gostivar",
        "Želino",
        "Centar Župa",
        "Kumanovo",
        "Debar",
        "Zrnovci",
        "Jegunovce",
      ]);
      setIsLoaded(true);
    }
  });
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Sucessfully Registered for the trip{" "}
            </AlertDialogHeader>

            <AlertDialogBody>
              Navigate to your trips to see details
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="green" onClick={onClose} ml={3}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Header />

      <Stack width="100%">
        <Center mt={10}>
          <Heading size="xl">Find Offered Trip</Heading>
        </Center>
        <Center>
          <Box w="60%" borderRadius="md" borderColor="grey" px={4}>
            <Select
              pb={2}
              placeholder="Select origin"
              onChange={(event) => {
                setOrigin(event.target.value);
              }}
            >
              {cities.map((city) => {
                return <option value={city}>{city}</option>;
              })}
            </Select>
            <Select
              pb={2}
              placeholder="Select destination"
              hidden={!origin}
              onChange={(event) => {
                setDestination(event.target.value);
              }}
            >
              {cities
                .filter((city) => city != origin)
                .map((city) => {
                  return <option value={city}>{city}</option>;
                })}
            </Select>
            <InputGroup pb={2}>
              <Input
                hidden={!(origin && destination)}
                type="datetime-local"
                placeholder="departureTimeFrom"
                onChange={(event) => {
                  setDepartureTimeFrom(event.target.value);
                }}
              />
            </InputGroup>

            <InputGroup pb={2}>
              <Input
                hidden={!(origin && destination && departureTimeFrom)}
                type="datetime-local"
                placeholder="departureTimeTo"
                onChange={(event) => {
                  setDepartureTimeTo(event.target.value);
                }}
              />
            </InputGroup>

            <InputGroup>
              <Input
                hidden={
                  !(
                    origin &&
                    destination &&
                    departureTimeFrom &&
                    departureTimeTo
                  )
                }
                type="number"
                placeholder="price"
                onChange={(event) => {
                  setPrice(parseInt(event.target.value));
                }}
              />
            </InputGroup>
            <Button
              mt={2}
              w={"100%"}
              colorScheme="purple"
              onClick={() => {
                performSearch();
              }}
              hidden={
                !(
                  origin &&
                  destination &&
                  departureTimeFrom &&
                  departureTimeTo &&
                  price
                )
              }
            >
              Search
            </Button>

            {trips && (
              <Center>
                <Heading size="xl" pb={3} pt={6}>
                  Search Results
                </Heading>
              </Center>
            )}
            {trips &&
              trips.map((trip) => {
                return (
                  <>
                    <Flex
                      borderRadius="md"
                      borderColor="grey"
                      borderWidth="2px"
                      mb={2}
                    >
                      <Box m={4} mb={2}>
                        <Text>Origin: {trip["origin"]["name"]}</Text>
                        <Text>Destination: {trip["destination"]["name"]}</Text>
                        <Text>Price: {trip["price"]}</Text>
                        <Text>Offered Seats: {trip["offeredSeats"]}</Text>
                        <Text>Driver: {trip["driver"]["username"]}</Text>
                        <Link>Meeting Place</Link>
                      </Box>
                      <Spacer></Spacer>
                      <Box alignItems="right">
                        <Center h="100%">
                          <Button
                            mr={3}
                            colorScheme="purple"
                            variant="outline"
                            onClick={() => {
                              performRegister(trip["id"]);
                            }}
                          >
                            Register
                          </Button>
                        </Center>
                      </Box>
                    </Flex>
                  </>
                );
              })}
          </Box>
        </Center>

        <Divider visibility="hidden" />
      </Stack>
    </>
  );
};

export default Home;
