import React, { useEffect, useState } from "react";
import { Select, Stack, Input, InputGroup, Button } from "@chakra-ui/react";
import "react-date-picker/dist/DatePicker.css";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

import { Header, Main, Cards, Footer } from "@components";

const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cities, setCities] = useState([]);

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureTimeFrom, setDepartureTimeFrom] = useState(null);
  const [departureTimeTo, setDepartureTimeTo] = useState(null);

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
      <Header />
      <Stack>
        <Select
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
        <InputGroup>
          <Input
            hidden={!(origin && destination)}
            type="datetime-local"
            placeholder="departureTimeFrom"
            onChange={(event) => {
              setDepartureTimeFrom(event.target.value);
            }}
          />
        </InputGroup>

        <InputGroup>
          <Input
            hidden={!(origin && destination && departureTimeFrom)}
            type="datetime-local"
            placeholder="departureTimeTo"
            onChange={(event) => {
              setDepartureTimeTo(event.target.value);
            }}
          />
        </InputGroup>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {}}
          hidden={
            !(origin && destination && departureTimeFrom && departureTimeTo)
          }
        >
          Search
        </Button>
      </Stack>
    </>
  );
};

export default Home;
