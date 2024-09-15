import SideNavbar from '@/components/menuBuilderComponent/SideNavbar';
import React from 'react';

type Props = {};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className='flex gap-4 h-full'>
    <SideNavbar />
    <div>{children}</div>
    </div>

    </>
  );
}
