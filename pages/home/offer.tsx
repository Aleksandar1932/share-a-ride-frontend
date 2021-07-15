import React, { useEffect, useState } from "react";
import {
  Select,
  Stack,
  Input,
  InputGroup,
  Button,
  Box,
  Divider,
  Text,
  Center,
  Flex,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import "react-date-picker/dist/DatePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import Link from "next/link";

import { Header, Main, Cards, Footer } from "@components";

const Offer: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [originName, setOriginName] = useState(null);
  const [destinationName, setDestinationName] = useState(null);
  const [departure, setDeparture] = useState(null);
  const [meetingPlaceId, setMeetingPlaceId] = useState(
    process.env.SAMPLE_MEETING_PLACE_ID
  );
  const [offeredSeats, setOfferedSeats] = useState(null);

  const [trips, setTrips] = useState(null);

  let BACKEND_URL = process.env.BACKEND_URL;
  const performOffer = async () => {
    const response = await fetch(BACKEND_URL + "/api/trip/offer", {
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
        description: description,
        price: price,
        originName: originName,
        destinationName: destinationName,
        departure: departure.replace("T", " "),
        meetingPlaceId: meetingPlaceId,
        offeredSeats: offeredSeats,
        driverUsername: localStorage.getItem("username"),
      }),
    });
    setIsOpen(true);
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
              You have sucessfully offered a trip
            </AlertDialogHeader>

            <AlertDialogBody>
              Navigate to your trips to see details
            </AlertDialogBody>

            <AlertDialogFooter>
              <Center>
                <Link href="/my/offered">
                  <Button colorScheme="green" onClick={onClose} ml={3}>
                    My Trips
                  </Button>
                </Link>
                <Link href="/home">
                  <Button colorScheme="green" onClick={onClose} ml={3}>
                    Home
                  </Button>
                </Link>
              </Center>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Header />
      <Center h="70vh">
        <Stack width="60%">
          <Center>
            <Heading p={2}>Offer a Trip</Heading>
          </Center>

          <InputGroup>
            <Input
              type="text"
              placeholder="Description"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="number"
              placeholder="Price"
              onChange={(event) => {
                setPrice(event.target.value);
              }}
            />
          </InputGroup>

          <Select
            placeholder="Select origin"
            onChange={(event) => {
              setOriginName(event.target.value);
            }}
          >
            {cities.map((city) => {
              return <option value={city}>{city}</option>;
            })}
          </Select>

          <Select
            placeholder="Select destination"
            onChange={(event) => {
              setDestinationName(event.target.value);
            }}
          >
            {cities
              .filter((city) => city != originName)
              .map((city) => {
                return <option value={city}>{city}</option>;
              })}
          </Select>

          <InputGroup>
            <Input
              type="datetime-local"
              placeholder="Departure Time"
              onChange={(event) => {
                setDeparture(event.target.value);
              }}
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="number"
              placeholder="Offered Seats"
              onChange={(event) => {
                setOfferedSeats(event.target.value);
              }}
            />
          </InputGroup>

          <Button
            colorScheme="purple"
            onClick={() => {
              performOffer();
            }}
          >
            Offer
          </Button>

          <Divider />
          {trips &&
            trips.map((trip) => {
              return (
                <>
                  <Flex>
                    <Box borderRadius="md" color="grey" px={4}>
                      <Text>Origin: {trip["origin"]["name"]}</Text>
                      <Text>Destination: {trip["destination"]["name"]}</Text>
                      <Text>Price: {trip["price"]}</Text>
                      <Text>Offered Seats: {trip["offeredSeats"]}</Text>
                      <Text>Driver: {trip["driver"]["username"]}</Text>
                      <Link href={"#"}>Meeting Place</Link>
                    </Box>
                    <Spacer></Spacer>
                    <Box alignItems="right">
                      <Button
                        colorScheme="teal"
                        variant="outline"
                        onClick={() => {
                          performOffer();
                        }}
                      >
                        Register
                      </Button>
                    </Box>
                  </Flex>
                  <Divider />
                </>
              );
            })}
        </Stack>
      </Center>
    </>
  );
};

export default Offer;
