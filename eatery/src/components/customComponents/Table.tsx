"use client";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Props = {
  tableHead: string[];
};

const Tablecomponent = ({ tableHead }: Props) => {
  return (
    <div className="flex justify-center">
      <TableContainer>
        <Table size="sm">
          <Thead display={"flex"}>
            {tableHead.map((el) => (
              <Tr>
                <Th>{el}</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
            </Tr>
            <Tr>
              <Td>centimetres</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
            </Tr>
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>

            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tablecomponent;
