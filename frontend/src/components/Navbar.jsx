import React from 'react'
import { IoSearchCircleOutline } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { HiUser } from "react-icons/hi";
import { MdLogin } from "react-icons/md";

import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router';
import { useSelector } from 'react-redux';


function Navbar() {
  const currentUser=false
  const cartItems=useSelector((state)=>(state.cart.cartItems))
  console.log(cartItems);
  const [isDroppedDown, setIsDroppedDown] = React.useState(false)
  console.log(isDroppedDown)
  const navigation =[
    {
      name : 'Orders',
      herf: '/orders'
    },
    {
      name : 'Profile',
      herf: '/profile'
    },
    {
      name:"Support",
      herf: '/support'
    },
    {
      name : 'Logout',
      herf: '/logout'
    },

  ]
  return (
    <header className='max-w-screen-2xl mx-autopx px-4 py-6'>
        <nav className='flex justify-between items-center '>
        <div className='flex items-center justify-between'>
            {/* left side */}
         <Link to="/">
         <RiMenu2Line className='w-8 h-8' />
         </Link>
            <div className='flex items-center relative sm:w-72 w-40 space-x-2'>
                {/* search box */}
            <IoSearchCircleOutline className='w-8 h-8 absolute left-2 inline-block' />
            <input type="text" placeholder='Search here' className='bg-[#EAEAEA] w-full py-2 px-8 rounded-xl focus:outline-none' />
            </div>
        </div>
        <div className='flex justify-evenly gap-2'>
            {/* right side  */}
         {currentUser? <>
         <button className='relative ' onClick={()=>{setIsDroppedDown(!isDroppedDown)}} >
         <HiUser className='size-8'/>
         {
           isDroppedDown&& <div className='absolute top-10 bg-primary p-2 rounded-xl shadow-lg '>
            <ul>
              {
                navigation.map((item)=>(
                  <li className=' px-6 py-1 md:px-8 font-primary border-b-2 border-white ' key={item.name}>
                    <Link className='text-white hover:font-semibold' to={item.herf}>
                    {item.name}
                    </Link>
                  </li>
                ))
              }
            </ul>
          </div>
         }
         </button>
         </>
         : 
        <Link to="/login">
        <MdLogin className='size-8' />
        </Link> 
         }
            <button className='hidden sm:block'>
            <FaRegHeart className='size-8' />
            </button>
            <Link to="/cart" className='bg-primary px-6 rounded-2xl flex gap-2 items-center justify-between'>
            <BsCart4 className='size-8'/>
{
 cartItems.length&& <span className=' font-bold text-xl '>{cartItems.length}</span>
}
            </Link>



        </div>
 
    </nav>
    </header>
  )
}

export default Navbar