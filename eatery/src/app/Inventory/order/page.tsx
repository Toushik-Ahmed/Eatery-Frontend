'use client';
import OrderComponent from '@/components/inventoryComponent/OrderComponent';
import VendorItems from '@/components/inventoryComponent/VendorItems';
import { useState } from 'react';

type Props = {};

const page = (props: Props) => {
  const [vendor, setVendor] = useState(false);
  const handleClick = () => {
    setVendor((prevVendor) => !prevVendor);
  };

  return (
    <div>
      {vendor ? (
        <VendorItems handleClick={handleClick} />
      ) : (
        <OrderComponent handleClick={handleClick} />
      )}
    </div>
  );
};

export default page;
