import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

type Props = {};

function DropDown({}: Props) {
  return (
    <div className='w-fit'>
      <Menu  >
        <MenuButton

          as={Button}
          rightIcon={<IoChevronDownCircleOutline />}
        ></MenuButton>
        <MenuList p={0} m={0} w={'fit-content'} _hover={{color:"#1D1842"}}>
          <MenuItem w={'fit-content'} _hover={{color:"#1D1842"}}>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default DropDown;
