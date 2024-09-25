'use client';
import {
  deleteIngredient,
  IngredientsTable,
} from '@/redux/inventory/AddIngredientsSlice';
import { AppDispatch } from '@/redux/store';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

import { MdDeleteOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';

type Props = {
  tableHead: string[];
  ingredients: Partial<IngredientsTable>[];
  pageSize: number;
  pageNumber: number;
};

const Tablecomponent = ({
  tableHead,
  ingredients,
  pageSize,
  pageNumber,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = (id?: string) => {
    if (id) dispatch(deleteIngredient(id));
  };

  // useEffect(() => {
  //   dispatch(getAllIngredients({ pageSize, pageNumber }));
  // }, [dispatch]);

  return (
    <div className=" justify-center">
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              {tableHead.map((el, id) => (
                <Th key={id}>{el}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {ingredients.map((ingredient, index) => (
              <Tr key={index}>
                <Td>{ingredient.ingredient}</Td>
                <Td>{ingredient.unit}</Td>
                <Td>{ingredient.capacity}</Td>
                <Td>{ingredient.currentStock}</Td>

                <Td>{ingredient.poo}</Td>
                <Td>{ingredient.prevStock}</Td>

                <Td>
                  {ingredient.prevExpiary
                    ? format(parseISO(ingredient.prevExpiary), 'dd-MM-yyyy')
                    : ''}
                </Td>
                <Td>{ingredient.newStock}</Td>
                <Td>
                  {' '}
                  {ingredient.newStockExpiry
                    ? format(parseISO(ingredient.newStockExpiry), 'dd-MM-yyyy')
                    : ''}
                </Td>
                <Td>
                  {ingredient.incomingStock
                    ? format(parseISO(ingredient.incomingStock), 'dd-MM-yyyy')
                    : ''}
                </Td>
                <Td>
                  <Button
                    border={'none'}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => {
                      handleDelete(ingredient._id);
                    }}
                  >
                    <MdDeleteOutline />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablecomponent;
