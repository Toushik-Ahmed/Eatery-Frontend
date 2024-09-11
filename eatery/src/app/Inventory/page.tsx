import IngredientsTable from '@/components/inventoryComponent/IngredientsTable'
import SideNavbar from '@/components/inventoryComponent/SideNavbar'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='flex gap-4 '>
      <SideNavbar/>
      <div className='mt-4'>
      <IngredientsTable/>
      </div>

    </div>
  )
}

export default page