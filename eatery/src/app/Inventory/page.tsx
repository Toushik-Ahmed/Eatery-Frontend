import IngredientsTable from '@/components/inventoryComponent/IngredientsTable';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex gap-4 ">
      <div className="mt-4">
        <IngredientsTable />
      </div>
    </div>
  );
};

export default page;
