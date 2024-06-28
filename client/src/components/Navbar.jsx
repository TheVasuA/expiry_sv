import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Formvisible from '../pages/Formvisible';

const Navbar = ({ onAuthorize }) => {

  const [nav, setNav] = useState(false);


  const handleNav = () => {
    setNav(!nav);
  };



  return (
    <div className='bg-[#211951] flex justify-between items-center h-15  mx-auto px-8 text-white'>
      {/* Logo */}
      <h2 className=' hover:text-yellow-300 w-full text-3xl font-bold text-[rgb(255,255,255)] '>INFINITI</h2>
            {/* Desktop Navigation */}
      <nav>
          <ul className='hidden md:flex'>
            <li className='linkMenu'><Link to="/">Home</Link></li>
            <li className='linkMenu'><Link to="/vehicle">Vehicle</Link></li>
            <li className='linkMenu'><Link to="/pesotank">Peso Tank</Link></li>
            <li className='linkMenu'><Link to="/general">General</Link></li>
            <li className='linkMenu'><Link to="/policy">Policy</Link></li>
        
<Formvisible  onAuthorize ={ onAuthorize }/>
            <li>
            <Link to="/login">
            <button className='px-5 py-2 text-xl text-nowrap hover:bg-[rgb(16,80,60)] rounded-xl m-2 cursor-pointer duration-300 hover:text-black text-[#211951] bg-[#15F5BA]'>Login</button>
            </Link>
        </li>
          </ul>
        </nav>


      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#390d37] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>INFINITI</h1>

        {/* Mobile Navigation Items */}
        <li className='mobileMenu'><Link to="/">Homes</Link></li>
            <li className='mobileMenu'><Link to="/vehicle">Vehicle</Link></li>
            <li className='mobileMenu'><Link to="/pesotank">Peso Tank</Link></li>
            <li className='mobileMenu'><Link to="/general">General</Link></li>
            <li className='mobileMenu'><Link to="/policy">Policy</Link></li>
            
        <li className='text-center'>
            <button className='px-5 py-2 text-xl text-nowrap hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-blacktext-[#211951]  text-[#211951] bg-[#15F5BA]'>Login</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;