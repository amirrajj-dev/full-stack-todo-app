import { ModeToggle } from '@/components/ModeToggle'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen dark:bg-indigo-600 bg-red-600'>
      <ModeToggle/>
    </div>
  )
}

export default page