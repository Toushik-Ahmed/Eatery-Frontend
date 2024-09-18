import React from "react";
import SidebarWithHeader from "@/components/tableComponents/SideNavBar";
import IngredientsTable from "@/components/inventoryComponent/IngredientsTable";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <SidebarWithHeader />
      {/* <IngredientsTable /> */}
    </div>
  );
};

export default page;
