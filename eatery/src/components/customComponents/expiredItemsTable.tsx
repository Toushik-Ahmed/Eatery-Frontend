'use client';
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { format, parseISO } from 'date-fns';
import { ExpiredItems, wastageTable } from '../wastageComponents/WastageTable';

type Props = {
  tableHead: string[];
  ingredients: ExpiredItems[];
};

const ExpiredTablecomponent = ({ tableHead, ingredients }: Props) => {
  useEffect(() => {console.log("useEffect: ", ingredients)}, []);

  return (
    <div className=" justify-center">
      <TableContainer>
        <Table size="lg" fontSize={15}>
          <Thead>
            <Tr>
              {tableHead.map((el, id) => (
                <Th key={id} px={6} py={4}>
                  {' '}
                  {el}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {ingredients.map((ingredient, index) => (
              <Tr key={index}>
                <Td px={6} py={4}>
                  {ingredient.ingredient}
                </Td>{' '}
                <Td px={6} py={4}>
                  {ingredient.unit}
                </Td>
                <Td px={6} py={4}>
                  {ingredient.quantity}
                </Td>
                <Td px={6} py={4}>
                  {format(parseISO(ingredient.wastageDate), 'dd-MM-yyyy')}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ExpiredTablecomponent;
