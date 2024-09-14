import SideNavbar from '@/components/inventoryComponent/SideNavbar';
import React from 'react';

type Props = {};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex gap-4 h-full">
        <div className="">
          <SideNavbar />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </>
  );
}
