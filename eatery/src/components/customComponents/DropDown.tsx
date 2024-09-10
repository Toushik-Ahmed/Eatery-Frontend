import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

type Props = {};

function DropDown({}: Props) {
  return (
    <div>
      <Menu>
        <MenuButton
          px={0}
          py={0}
          as={Button}
          rightIcon={<IoChevronDownCircleOutline />}
        ></MenuButton>
        <MenuList p={0} m={0} w={'fit-content'}>
          <MenuItem w={'fit-content'} p={0} m={0}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default DropDown;
