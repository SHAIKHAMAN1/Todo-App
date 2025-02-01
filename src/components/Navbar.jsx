import React from 'react'

const Navbar = () => {
  return (
  <nav className='flex justify-between text-white bg-violet-900   py-4'>
    <div className="logo">
     <span className='font-bold text-xl p-5'>iTask</span>
    </div>
    <ul className='flex gap-8 mx-9' >
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>About</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-75'>Contact</li>
    </ul>
  </nav>
  )
}

export default Navbar
