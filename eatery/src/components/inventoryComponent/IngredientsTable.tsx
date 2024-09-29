"use client";
import {
  getAllIngredients,
  IngredientsTable,
} from "@/redux/inventory/AddIngredientsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { parse } from "date-fns";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../shared/components/Pagination/pagination";
import DropDown from "../customComponents/DropDown";
import Tablecomponent from "../customComponents/Table";

interface Props {}

function IngredientsTablecomponent({}: Props) {
  const filterITems = ["Date", "Name"];
  const th = [
    "Name",
    "UOM",
    "capacity",
    "Current-Stcok",

    "Order-Point",
    "Prev-Stock",
    "Expiry-Date",
    "New-Stock",
    "Expiry-Date(New)",
    "Incoming-Stock",
    "Delete",
  ];

  const dispatch = useDispatch<AppDispatch>();

  // Fetch all ingredients on mount
  useEffect(() => {
    dispatch(getAllIngredients({ pageSize, pageNumber }));
  }, [dispatch]);
  const [ingredients, setIngredients] = useState<IngredientsTable[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const allIngredients = useSelector(
    (state: RootState) => state.addIngredients.ingredients
  );
  const totalDataSelector = useSelector(
    (state: RootState) => state.addIngredients.totalData
  );

  useEffect(() => {
    setIngredients(allIngredients as IngredientsTable[]);
    setTotalData(totalDataSelector || 0);
  }, [allIngredients, totalDataSelector]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selectLabel, setSelectLabel] = useState("Sort-By");

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
        const dateA = parse(a.incomingStock, "dd-MM-yyyy", new Date());
        const dateB = parse(b.incomingStock, "dd-MM-yyyy", new Date());

        return dateA.getTime() - dateB.getTime();
      });

      setIngredients(sortedIngredientsByDate);
    } else return ingredients;
  };

  const handleSearch = () => {
    const searchedIngredients = allIngredients.filter((item) =>
      item.ingredient?.toLowerCase().includes(search.toLowerCase())
    );
    setIngredients(searchedIngredients as IngredientsTable[]);
  };

  return (
    <div className="w-full">
      <div className=" mb-10">
        <p className="font-bold text-3xl">Ingredient-Lists</p>
        <div className="flex justify-end gap-4 mr-10">
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
                bg="#d91a40"
                color="white"
                borderRadius="full"
                _hover={{ bg: "#f53e62" }}
                onClick={handleSearch}
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
      <Tablecomponent
        tableHead={th}
        ingredients={ingredients}
        pageNumber={pageNumber}
        pageSize={pageSize}
      />
      <div className="flex justify-center mt-4">
        <Pagination
          totalData={totalData}
          pageNumber={pageNumber}
          pageSize={pageSize}
          onPageChange={({ pageNumber, pageSize }) => {
            setPageNumber(pageNumber);
            setPageSize(pageSize);
            dispatch(getAllIngredients({ pageSize, pageNumber }));
          }}
        ></Pagination>
      </div>
    </div>
  );
}
export default IngredientsTablecomponent;
