'use client';
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

type Props = {
  selectLabel: string;
  items: string[];
  onSelect?: (value: string) => void;
};

function DropDown({ items, selectLabel, onSelect }: Props) {
  return (
    <div className="w-fit">
      <Menu>
        <MenuButton as={Button} rightIcon={<IoChevronDownCircleOutline />}>
          {selectLabel}
        </MenuButton>
        <MenuList
          p={0}
          m={0}
          minWidth={'140px'}
          maxWidth={'140px'}
          width={'140px'}
          _hover={{ color: '#1D1842' }}>
          {items?.map((item, idx) => (
            <MenuItem
              key={idx}
              w={'100%'}
              _hover={{ color: '#1D1842' }}
              onClick={() => onSelect && onSelect(item)}>
              {item}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}

export default DropDown;
