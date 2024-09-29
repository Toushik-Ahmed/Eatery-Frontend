"use client";
import { removeToken } from "@/services/tokenServices";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { IoChevronDownCircleOutline } from "react-icons/io5";

type Props = {
  selectLabel: string | undefined;
  items: string[];
  onSelect?: (value: string) => void;
};

function DropDown({ items, selectLabel, onSelect }: Props) {
  

  return (
    <div className="w-fit">
      <Menu>
        <MenuButton
          as={Button}
          color="black"
          _hover={{ bg: "#d91a40", color: "white" }}
          borderRadius="full"
          boxShadow="md"
          rightIcon={<IoChevronDownCircleOutline />}
        >
          {selectLabel}
        </MenuButton>
        <MenuList
          p={0}
          m={0}
          minWidth={"140px"}
          maxWidth={"140px"}
          width={"140px"}
          _hover={{ bg: "gray.200" }}
        >
          {items?.map((item, idx) => (
            <MenuItem
              key={idx}
              w={"100%"}
              _hover={{ bg: "gray.200 ", color: "black" }}
              onClick={() => onSelect && onSelect(item)}
            >
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

export default DropDown;
