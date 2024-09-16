'use client';
import { useState } from 'react';
import VendorCard from './VendorCard';
import vendor from './assets/meatVendor.avif';
import vegetable from './assets/vegetables-and-fruits-farmers-market.webp';

type Props = {
  handleClick: () => void;
};

const OrderComponent = ({ handleClick }: Props) => {
  // const [ingredient, setIngredient] = useState('');
  // const [quantity, setQuantity] = useState('');
  // const [unit, setUnit] = useState('');
  // const [alergens, setAlergens] = useState<string>('No');

  // const handleSubmit = () => {
  //   const orderForm = {
  //     ingredient,
  //     quantity,
  //     unit,

  //   };
  //   console.log(orderForm); // for testing
  // };

  // const handleCancel = () => {
  //   setAlergens('');
  //   setIngredient('');
  //   setQuantity('');
  //   setUnit('');
  // };

  return (
    <div className="m-4">
      <div className="font-semibold text-3xl mb-10">Vendor-Lists</div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
          handleClick={handleClick}
        />
        <VendorCard
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
          handleClick={handleClick}
        />
        <VendorCard
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
          handleClick={handleClick}
        />
        <VendorCard
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
          handleClick={handleClick}
        />
        <VendorCard
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
          handleClick={handleClick}
        />
        <VendorCard
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
        <VendorCard
          src={vendor.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Meat-Vendor"
          handleClick={handleClick}
        />
        <VendorCard
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default OrderComponent;
