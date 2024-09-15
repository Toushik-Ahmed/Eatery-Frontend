// "use client";

// import { parse } from "date-fns";
// import { useState } from "react";
// import Pagination from "../../shared/components/Pagination/pagination";
// import DropDown from "../customComponents/DropDown";
// import Tablecomponent from "../customComponents/Table";

// interface Props {}

// function WastageTable({}: Props) {
//   const filterITems = ["Date", "Name"];
//   const th = [
//     "Name",
//     "UOM",
//     "Current-Stcok",
//     "Unit-Cost",
//     "Order-Point",
//     "Prev-Stock",
//     "Expiary-Date",
//     "New-Stock",
//     "expiary-Date",
//     "Incoming-Stock",
//     "Delete",
//   ];

//   let dummyIngredients = [
//     {
//       Name: "zotato",
//       UOM: "K.G",
//       CurrentStock: 20,
//       UnitCost: 60,
//       OrderPoint: 5,
//       Prevstock: 15,
//       Expiarydate: "20-5-2024",
//       NewStock: 20,
//       expiarydate: "10-6-2024",
//       IncomingStock: "19-5-2024",
//     },
//     {
//       Name: "potato",
//       UOM: "K.G",
//       CurrentStock: 20,
//       UnitCost: 60,
//       OrderPoint: 5,
//       Prevstock: 15,
//       Expiarydate: "20-5-2024",
//       NewStock: 20,
//       expiarydate: "10-6-2024",
//       IncomingStock: "31-5-2024",
//     },
//   ];
//   const [ingredients, setIngredients] = useState(dummyIngredients);
//   const [filter, setFilter] = useState("");
//   const [selectLabel, setSelectLabel] = useState("Sort-By");

//   const handleFilter = (value: string) => {
//     setFilter(value);
//     console.log(filter);
//     setSelectLabel(value);

//     if (filter === "Name") {
//       const sortedIngredients = ingredients.toSorted((a, b) =>
//         a.Name > b.Name ? 1 : a.Name < b.Name ? -1 : 0
//       );
//       setIngredients(sortedIngredients);
//     } else if (filter === "Date") {
//       const sortedIngredientsByDate = ingredients.toSorted((a, b) => {
//         const dateA = parse(a.IncomingStock, "dd-MM-yyyy", new Date());
//         const dateB = parse(b.IncomingStock, "dd-MM-yyyy", new Date());

//         return dateA.getTime() - dateB.getTime();
//       });

//       setIngredients(sortedIngredientsByDate);
//     } else return ingredients;
//   };

//   const handleSearch = () => {
//     const searchedItems = dummyIngredients.filter((el) =>
//       el.Name.toLowerCase().includes(search.toLowerCase())
//     );
//     dummyIngredients = searchedItems;
//     setIngredients(dummyIngredients);
//   };

//   return (
//     <div className="w-full">
//       <div className="flex justify-between mb-10">
//         <p className="font-bold text-3xl">Wastage</p>
//         <div className="flex gap-4 mr-10">
//           <DropDown
//             selectLabel={selectLabel}
//             items={filterITems}
//             onSelect={handleFilter}
//           />
//         </div>
//       </div>
//       <Tablecomponent tableHead={th} ingredients={ingredients} />
//       <div className="flex justify-center mt-4">
//         <Pagination
//           totalData={100}
//           onPageChange={(ev) => {
//             console.log(ev);
//           }}
//         ></Pagination>
//       </div>
//     </div>
//   );
// }

// export default WastageTable;

"use client";

import { useState } from "react";
import Tablecomponent from "../customComponents/Table";

interface Props {}

function WastageTable({}: Props) {
  const th = ["Name", "UOM", "Wastage"];

  let dummyIngredients = [
    {
      Name: "zotato",
      UOM: "K.G",
      CurrentStock: 20,
    },
    {
      Name: "potato",  
      UOM: "K.G",
      CurrentStock: 20,
    },
  ];

  const [ingredients, setIngredients] = useState(dummyIngredients);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-10">
        <p className="font-bold text-3xl">Wastage</p>
      </div>
      <Tablecomponent tableHead={th} ingredients={ingredients} />
    </div>
  );
}

export default WastageTable;
