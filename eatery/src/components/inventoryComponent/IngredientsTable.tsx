'use client';
import { getAllIngredients } from '@/redux/inventory/AddIngredientsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../shared/components/Pagination/pagination';
import DropDown from '../customComponents/DropDown';
import Tablecomponent from '../customComponents/Table';

interface Props {}

function IngredientsTable({}: Props) {
  const filterITems = ['Date', 'Name'];
  const th = [
    'Name',
    'UOM',
    'Current-Stcok',
    'Unit-Cost',
    'Order-Point',
    'Prev-Stock',
    'Expiary-Date',
    'New-Stock',
    'expiary-Date',
    'Incoming-Stock',
    'Delete',
  ];

  let dummyIngredients = [
    {
      Name: 'zotato',
      UOM: 'K.G',
      CurrentStock: 20,
      UnitCost: 60,
      OrderPoint: 5,
      Prevstock: 15,
      Expiarydate: '20-5-2024',
      NewStock: 20,
      expiarydate: '10-6-2024',
      IncomingStock: '19-5-2024',
    },
    {
      Name: 'potato',
      UOM: 'K.G',
      CurrentStock: 20,
      UnitCost: 60,
      OrderPoint: 5,
      Prevstock: 15,
      Expiarydate: '20-5-2024',
      NewStock: 20,
      expiarydate: '10-6-2024',
      IncomingStock: '31-5-2024',
    },
  ];

  const [ingredients, setIngredients] = useState(dummyIngredients);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [selectLabel, setSelectLabel] = useState('Sort-By');
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllIngredients());
  }, [dispatch]);

  const allIngredients = useSelector(
    (state: RootState) => state.addIngredients
  );
  console.log(allIngredients);

  const handleFilter = (value: string) => {
    setFilter(value);
    console.log(filter);
    setSelectLabel(value);

    if (filter === 'Name') {
      const sortedIngredients = ingredients.toSorted((a, b) =>
        a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0
      );
      setIngredients(sortedIngredients);
    } else if (filter === 'Date') {
      const sortedIngredientsByDate = ingredients.toSorted((a, b) => {
        const dateA = parse(a.IncomingStock, 'dd-MM-yyyy', new Date());
        const dateB = parse(b.IncomingStock, 'dd-MM-yyyy', new Date());

        return dateA.getTime() - dateB.getTime();
      });

      setIngredients(sortedIngredientsByDate);
    } else return ingredients;
  };

  const handleSearch = () => {
    const searchedItems = dummyIngredients.filter((el) =>
      el.Name.toLowerCase().includes(search.toLowerCase())
    );
    dummyIngredients = searchedItems;
    setIngredients(dummyIngredients);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-10">
        <p className="font-bold text-3xl">Ingredient-Lists</p>
        <div className="flex gap-4 mr-10">
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
            selectLabel={selectLabel}
            items={filterITems}
            onSelect={handleFilter}
          />
        </div>
      </div>
      <Tablecomponent tableHead={th} ingredients={ingredients} />
      <div className="flex justify-center mt-4">
        <Pagination
          totalData={100}
          onPageChange={(ev) => {
            console.log(ev);
          }}
        ></Pagination>
      </div>
    </div>
  );
}

export default IngredientsTable;
