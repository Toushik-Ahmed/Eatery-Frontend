<<<<<<< HEAD
import React from "react";
import SidebarWithHeader from "@/components/tableComponents/SideNavBar";


type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <SidebarWithHeader />
    </div>
  );
};

export default page;
=======
"use client";

import PersistentDrawerLeft from "@/components/tableComponents/SideNavBar";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div>
      <PersistentDrawerLeft />
    </div>
  );
}

export default Page;
>>>>>>> table
