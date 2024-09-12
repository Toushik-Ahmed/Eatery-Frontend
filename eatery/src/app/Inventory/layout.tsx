import SideNavbar from '@/components/inventoryComponent/SideNavbar';
import React from 'react';

type Props = {};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideNavbar />
      <div>{children}</div>
    </>
  );
}
