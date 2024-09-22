'use client';

import { getAllWastageItems } from '@/apiServices/inventory/inventoryApi';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import DropDown from '../customComponents/DropDown';
import ExpiredTablecomponent from '../customComponents/expiredItemsTable';

export interface wastageTable {
  ingredient: string;
  unit: string;
  quantity: number;
  wastageDate: string;
}
interface Props {}

function WastageTable({}: Props) {
  const th = ['INGREDIENT', 'UNIT', 'QUANTITY', 'DATE'];
  const filterITems = ['Date', 'Name'];
  const [ingredients, setIngredients] = useState<wastageTable[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [selectLabel, setSelectLabel] = useState('Sort-By');

  // Fetch the wastage items on mount
  useEffect(() => {
    const expiredItems = async () => {
      const response = await getAllWastageItems();
      setIngredients(response);
    };
    expiredItems();
  }, []); // Make sure to pass an empty dependency array to run only on mount

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    const searchedIngredients = ingredients.filter((item) =>
      item.ingredient?.toLowerCase().includes(search.toLowerCase())
    );
    setIngredients(searchedIngredients as wastageTable[]);
  };

  // Handle filter functionality
  const handleFilter = (value: string) => {
    setSelectLabel(value);
    setFilter(value);

    if (value === 'Name') {
      const sortedIngredients = [...ingredients].sort((a, b) =>
        a.ingredient > b.ingredient ? 1 : a.ingredient < b.ingredient ? -1 : 0
      );
      setIngredients(sortedIngredients);
    } else if (value === 'Date') {
      const sortedIngredientsByDate = [...ingredients].sort((a, b) => {
        const dateA = parse(a.wastageDate, 'dd-MM-yyyy', new Date());
        const dateB = parse(b.wastageDate, 'dd-MM-yyyy', new Date());
        return dateA.getTime() - dateB.getTime();
      });
      setIngredients(sortedIngredientsByDate);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-10">
        <p className="font-bold text-3xl">Wastage</p>
      </div>

      <div className=" w-full flex justify-end ">
        <div className="flex gap-4 mr-10">
          {/* Search bar */}
          <form onSubmit={handleSearch}>
            <InputGroup w={'10vw'} borderRadius="28px" boxShadow="md">
              <Input
                placeholder="Search items"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderRadius="full"
                _placeholder={{ color: 'gray.400' }}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search database"
                  icon={<IoIosSearch />}
                  size="sm"
                  bg="#f53e62"
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: '#f53e62' }}
                  onClick={handleSearch}
                />
              </InputRightElement>
            </InputGroup>
          </form>
          {/* Filter dropdown */}
          <DropDown
            selectLabel={selectLabel}
            items={filterITems}
            onSelect={handleFilter}
          />
        </div>
      </div>
      {/* Table of expired ingredients */}
      <ExpiredTablecomponent tableHead={th} ingredients={ingredients} />
    </div>
  );
}

export default WastageTable;
