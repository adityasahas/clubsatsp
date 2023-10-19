// @ts-nocheck
"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Image,
  CardFooter,
  ModalFooter,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import FlipMove from "react-flip-move";

import axios from "axios";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";

export const Navbar = () => {
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debounce(handleSearch, 300)();
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        const response = await axios.post(
          "/api/search",
          { searchTerm: searchTerm },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log("API Response:", response.data);

        setSearchResults(response.data.clubs);
      } catch (error) {
        console.error("Error searching clubs:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  const searchButton = (
    <Button
      aria-label="Open search"
      onPress={onOpen}
      className="flex items-center gap-2"
    >
      <SearchIcon className="text-base text-default-400" />
      <p className="text-sm">search for a club</p>
    </Button>
  );

  const searchInput = (
    <Input
      size="lg"
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="search for a club"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">clubs at sp</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" sm:flex basis-1/5 sm:basis-full" justify="end">
        <ThemeSwitch />

        <NavbarItem className=" lg:flex">{searchButton}</NavbarItem>
      </NavbarContent>
      <FlipMove>
        <Modal
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          className="p-4"
          placement="auto"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <Input
                    autoFocus
                    size="lg"
                    aria-label="Search"
                    classNames={{
                      inputWrapper: "bg-default-100",
                      input: "text-sm",
                    }}
                    labelPlacement="outside"
                    placeholder="search for a club"
                    startContent={
                      <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    type="search"
                    onChange={handleInputChange}
                  />
                  <FlipMove typeName="ul">
                    {searchResults.map((club) => (
                      <li key={club._id}>
                        <Link href={`/${club.clubURL}`}>
                          <Card
                            className="flex flex-row items-center mx-auto"
                            isPressable
                            isHoverable
                            isBlurred
                          >
                            <Image
                              src={club.clubImage}
                              removeWrapper
                              className="w-auto h-20"
                            />
                            <CardBody>
                              <p>{club.clubName}</p>
                            </CardBody>
                          </Card>
                        </Link>
                      </li>
                    ))}
                  </FlipMove>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </FlipMove>
    </NextUINavbar>
  );
};
