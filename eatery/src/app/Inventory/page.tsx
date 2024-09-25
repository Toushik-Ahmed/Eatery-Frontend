import IngredientsTable from '@/components/inventoryComponent/IngredientsTable';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex gap-4 ">
      {/* <SideNavbar/> */}
      <div className="mt-4 w-full">
        <IngredientsTable />
      </div>
    </div>
  );
};

export default page;
