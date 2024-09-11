'use client';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { IoIosSearch } from 'react-icons/io';
import DropDown from '../customComponents/DropDown';
import Tablecomponent from '../customComponents/Table';
import { useState } from 'react';

interface Props {}

function IngredientsTable({}: Props) {
  const filterITems = ['Date', 'Name'];
  const th = [
    'Name',
    'UOM',
    'CurrentStcok',
    'UnitCost',
    'OrderPoint',
    'Prevstock',
    'Expiarydate',
    'NewStock',
    'expiarydate',
    'IncomingStock',
  ];

  let dummyIngredients = [
    {
      Name: 'zotato',
      UOM: 'K.G',
      'CurrentStock': 20,
      'UnitCost': 60,
      'OrderPoint': 5,
      'Prevstock': 15,
      'Expiarydate': '20-5-2024',
      'NewStock': 20,
      'expiarydate': '10-6-2024',
      'IncomingStock': '28-5-2024',
    },
    {
      Name: 'sugar',
      UOM: 'K.G',
      'CurrentStock': 20,
      'UnitCost': 60,
      'OrderPoint': 5,
      'Prevstock': 15,
      'Expiarydate': '20-5-2024',
      'NewStock': 20,
      'expiarydate': '10-6-2024',
      'IncomingStock': '28-5-2024',
    },
  ];
  const [ingredients, setIngredients] = useState(dummyIngredients);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const handleFilter = (value: string) => {
    setFilter(value);
    console.log(filter);
    if (filter === 'Name') {
      const sortedIngredients = ingredients.toSorted((a, b) =>
        a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0
      );
      setIngredients(sortedIngredients);
      console.log(sortedIngredients);
    }
  };

  const handleSearch = () => {
    const searchedItems = dummyIngredients.filter((el) =>
      el.Name.toLowerCase().includes(search.toLowerCase())
    );
    dummyIngredients = searchedItems;
    setIngredients(dummyIngredients);
  };

  return (
    <div className="w-[70vw]">
      <div className="flex justify-between mb-8">
        <p className="font-bold text-lg">Ingredient-Lists</p>
        <div className="flex gap-4">
          <InputGroup w={'8vw'} borderRadius="28px">
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightElement>
              <IconButton
                aria-label="Search database"
                icon={<IoIosSearch />}
                size="sm"
                onClick={() => handleSearch()}
              />
            </InputRightElement>
          </InputGroup>
          <DropDown
            actions={'sort by'}
            items={filterITems}
            onSelect={handleFilter}
          />
        </div>
      </div>
      <Tablecomponent tableHead={th} ingredients={ingredients} />
    </div>
  );
}

export default IngredientsTable;
