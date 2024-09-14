'use client';
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

import { MdDeleteOutline } from 'react-icons/md';

type Ingredient = {
  Name: string;
  UOM: string;
  CurrentStock: number;
  UnitCost: number;
  OrderPoint: number;
  Prevstock: number;
  Expiarydate: string;
  NewStock: number;
  expiarydate: string;
  IncomingStock: string;
};

type Props = {
  tableHead: string[];
  ingredients: Ingredient[];
};

const Tablecomponent = ({ tableHead, ingredients }: Props) => {
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
                <Td>{ingredient.Name}</Td>
                <Td>{ingredient.UOM}</Td>
                <Td>{ingredient.CurrentStock}</Td>
                <Td>{ingredient.UnitCost}</Td>
                <Td>{ingredient.OrderPoint}</Td>
                <Td>{ingredient.Prevstock}</Td>
                <Td>{ingredient.Expiarydate}</Td>
                <Td>{ingredient.NewStock}</Td>
                <Td>{ingredient.expiarydate}</Td>
                <Td>{ingredient.IncomingStock}</Td>

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
