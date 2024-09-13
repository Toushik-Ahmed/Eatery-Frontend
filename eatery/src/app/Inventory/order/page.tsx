import OrderComponent from '@/components/inventoryComponent/OrderComponent';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-fit flex justify-center items-center text-center">
      <OrderComponent />
    </div>
  );
};

export default page;
