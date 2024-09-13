import InventoryForm from '@/components/inventoryComponent/InventoryForm';

type Props = {};

const page = (props: Props) => {
  return (
    <div className=" w-[50vw] flex justify-center items-center ">
      <div className='flex justify-center'>
        <InventoryForm />
      </div>
    </div>
  );
};

export default page;
