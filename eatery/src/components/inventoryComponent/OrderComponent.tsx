'use client';
import VendorCard from './VendorCard';
import vendor from './assets/meatVendor.avif';
import vegetable from './assets/vegetables-and-fruits-farmers-market.webp';

type Props = {
  handleClick: () => void;
};

const OrderComponent = ({ handleClick }: Props) => {
  return (
    <div className="m-4">
      <div className="font-bold text-3xl mb-10">Vendor-Lists</div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]  gap-y-4">
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
          src={vegetable.src}
          alt="vendorPic"
          Email="meat24@gmail.com"
          Phone="0187909092"
          heading="Green-Vege"
          handleClick={handleClick}
        />
        
        {/* <VendorCard
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
        /> */}
      </div>
    </div>
  );
};

export default OrderComponent;
