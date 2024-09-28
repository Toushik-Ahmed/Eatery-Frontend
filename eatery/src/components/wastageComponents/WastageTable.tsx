"use client";

import { getAllWastageItems } from "@/apiServices/inventory/inventoryApi";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { parse } from "date-fns";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import DropDown from "../customComponents/DropDown";
import ExpiredTablecomponent from "../customComponents/expiredItemsTable";
import Pagination from "@/shared/components/Pagination/pagination";

export interface wastageTable {
  expiredItems: ExpiredItems[];
  totalData: number;
}

export interface ExpiredItems {
  ingredient: string;
  unit: string;
  quantity: number;
  wastageDate: string;
}

interface Props {}

function WastageTable({}: Props) {
  const th = ["INGREDIENT", "UNIT", "QUANTITY", "DATE"];
  const filterITems = ["Date", "Name"];
  const [wasteddata, setWastageData] = useState<wastageTable>({
    expiredItems: [],
    totalData: 0,
  });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectLabel, setSelectLabel] = useState("Sort-By");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalData, setTotalData] = useState(0);
  const [ingredients, setIngredients] = useState<ExpiredItems[]>([]);

  // Fetch the wastage items on mount
  useEffect(() => {
    const expiredItems = async () => {
      const response = await getAllWastageItems({ pageNumber, pageSize });
      setWastageData(response);
      setIngredients(response.expiredItems);
      setTotalData(response.totalData);
      console.log("new", response.expiredItems);
      console.log(response);
    };
    expiredItems();
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchedIngredients = ingredients.filter((item) =>
      item.ingredient?.toLowerCase().includes(search.toLowerCase())
    );
    setIngredients(searchedIngredients as ExpiredItems[]);
  };

  // Handle filter functionality
  const handleFilter = (value: string) => {
    setSelectLabel(value);
    setFilter(value);

    if (value === "Name") {
      const sortedIngredients = [...ingredients].sort((a, b) =>
        a.ingredient > b.ingredient ? 1 : a.ingredient < b.ingredient ? -1 : 0
      );
      setIngredients(sortedIngredients);
    } else if (value === "Date") {
      const sortedIngredientsByDate = [...ingredients].sort((a, b) => {
        const dateA = parse(a.wastageDate, "dd-MM-yyyy", new Date());
        const dateB = parse(b.wastageDate, "dd-MM-yyyy", new Date());
        return dateA.getTime() - dateB.getTime();
      });
      setIngredients(sortedIngredientsByDate);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between mb-">
        <p className="font-bold text-3xl">Wastage</p>
      </div>

      <div className=" w-full flex justify-end ">
        <div className="flex gap-4 mr-10">
          <form onSubmit={handleSearch}>
            <InputGroup w={"10vw"} borderRadius="28px" boxShadow="md">
              <Input
                placeholder="Search items"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                borderRadius="full"
                _placeholder={{ color: "gray.400" }}
              />
              <InputRightElement>
                <IconButton
                  aria-label="Search database"
                  icon={<IoIosSearch />}
                  size="sm"
                  bg="#f53e62"
                  color="white"
                  borderRadius="full"
                  _hover={{ bg: "#f53e62" }}
                  onClick={handleSearch}
                />
              </InputRightElement>
            </InputGroup>
          </form>

          <DropDown
            selectLabel={selectLabel}
            items={filterITems}
            onSelect={handleFilter}
          />
        </div>
      </div>

      <ExpiredTablecomponent tableHead={th} ingredients={ingredients} />
      <div className="flex justify-center mt-4">
        <Pagination
          totalData={totalData}
          onPageChange={({ pageNumber, pageSize }) => {
            setPageNumber(pageNumber);
            setPageSize(pageSize);
          }}
        ></Pagination>
      </div>
    </div>
  );
}

export default WastageTable;
