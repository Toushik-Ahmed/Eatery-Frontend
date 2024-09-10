'use client';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

type Props = {
  actions?: string;
  items?: string[];
};

function DropDown({ items, actions }: Props) {
  return (
    <div className="w-fit">
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<IoChevronDownCircleOutline />}
        >{actions}</MenuButton>
        <MenuList p={0} m={0} w={'fit-content'} _hover={{ color: '#1D1842' }}>
          {items?.map((item) => (
            <MenuItem w={'fit-content'} _hover={{ color: '#1D1842' }}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

export default DropDown;
