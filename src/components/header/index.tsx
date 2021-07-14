import React from "react";
import {
  Center,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Text,
} from "@chakra-ui/react";

import { Logo } from "@components";

export const Header: React.FC = () => {
  return (
    <Center bg="header.100" pt={2} pb={2}>
      <Link href="/home" pr={2}>
        <Button>Find Trip</Button>
      </Link>
      <Link href="/home/offer" pr={2}>
        <Button>Offer Trip</Button>
      </Link>
      <Menu>
        <MenuButton as={Button}>My Trips</MenuButton>
        <MenuList>
          <Link href="/my/offered">
            <MenuItem>Offered</MenuItem>
          </Link>
          <Link href="/my/passenger">
            <MenuItem>Registered as Passenger</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Center>
  );
};
