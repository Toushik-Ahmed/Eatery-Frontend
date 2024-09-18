'use client';
import { IngredientsTable } from '@/redux/inventory/AddIngredientsSlice';
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
import { format, parse } from 'date-fns';

import { MdDeleteOutline } from 'react-icons/md';

type Props = {
  tableHead: string[];
  ingredients: Partial<IngredientsTable>[];
};

const Tablecomponent = ({ tableHead, ingredients }: Props) => {
  console.log(ingredients);

  return (
    <div className="flex justify-center">
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
                <Td>{ingredient.cost}</Td>
                <Td>{ingredient.poo}</Td>
                <Td>{ingredient.prevStock}</Td>

                <Td>
                  {ingredient.prevExpiry
                    ? format(
                        parse(ingredient.prevExpiry, 'dd-MM-yyyy', new Date()),
                        'dd-MM-yyyy'
                      )
                    : ''}
                </Td>
                <Td>{ingredient.newStock}</Td>
                <Td>{ingredient.newStockExpiry}</Td>
                <Td>{ingredient.incomingStock}</Td>
                <Td>
                  <Button colorScheme="red">
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
