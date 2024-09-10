import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
import DropDown from '../customComponents/DropDown';
import Tablecomponent from '../customComponents/Table';

type Props = {};

function IngredientsTable({}: Props) {
  const filterITems = ['Date', 'Name'];
  const th = [
    'Name',
    'UOM',
    'Current Stcok',
    'Unit-Cost',
    'Order-Point',
    'Prev-stock',
    'Expiary',
    'New-Stock',
    'expiary',
    'Incoming-Stock',
  ];

  return (
    <div className="w-[70vw]">
      <div className="flex justify-between mb-8">
        <p className="font-bold text-lg">Ingredient-Lists</p>
        <div className="flex gap-4">
          <InputGroup w={'8vw'} borderRadius="28px">
            <Input placeholder="Search" />
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                icon={<IoIosSearch />}
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          <DropDown actions={'sort by'} items={filterITems} />
        </div>
      </div>
      <Tablecomponent tableHead={th} />
    </div>
  );
}

export default IngredientsTable;
