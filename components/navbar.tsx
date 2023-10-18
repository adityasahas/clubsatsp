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
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <ThemeSwitch />

        <NavbarItem className="hidden lg:flex">{searchButton}</NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1">
        <ThemeSwitch />

        <NavbarItem className="lg:flex">{searchButton}</NavbarItem>
      </NavbarContent>

      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="p-4"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>{searchInput}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </NextUINavbar>
  );
};
