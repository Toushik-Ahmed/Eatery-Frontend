import InventoryForm from '@/components/inventoryComponent/InventoryForm';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="  flex flex-col justify-center items-start mt-4 ">
      <div className="text-3xl font-bold mb-10">Add-Ingredients</div>
      <div className="flex justify-center w-full">
        <InventoryForm />
      </div>
    </div>
  );
};

export default page;
