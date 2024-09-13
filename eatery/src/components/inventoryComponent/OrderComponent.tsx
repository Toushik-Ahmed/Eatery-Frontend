'use client';
import { useState } from 'react';
import VendorCard from './VendorCard';
import vendor from './assets/meatVendor.avif';

type Props = {};

const OrderComponent = (props: Props) => {
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [alergens, setAlergens] = useState<string>('No');

  const handleSubmit = () => {
    const orderForm = {
      ingredient,
      quantity,
      unit,
      alergens,
    };
  };

  const handleCancel = () => {
    setAlergens('');
    setIngredient('');
    setQuantity('');
    setUnit('');
  };

  return (
    <div className="m-4">
      <div className="font-semibold">Vendor-Lists</div>

      <div className="grid grid-cols-3 gap-4 m-4 ">
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
        />
      </div>
    </div>
  );
};

export default OrderComponent;
