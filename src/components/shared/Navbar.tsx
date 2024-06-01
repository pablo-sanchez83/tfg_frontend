import { MdiChefHat } from '@/assets/ChefIcon';
import { useState, useContext } from 'react';
import { Contexto } from '../Auth/AuthContext';
import { LogOut, UserRound } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const context = useContext(Contexto);

  if (!context) {
    throw new Error("Contexto must be used within a Proveedor");
  }

  const { isLoggedIn, logout } = context;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (pathname: string) => location.pathname === pathname;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <MdiChefHat height={32} width={32} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Eatbook</span>
        </Link>
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Abrir menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className={`block py-2 px-3 rounded md:p-0 ${isActive('/') ? 'text-[#e67e22] underline' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#e67e22] dark:text-white md:dark:hover:text-[#e67e22] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/perfil" className={`block py-2 px-3 rounded md:p-0 ${isActive('/perfil') ? 'text-[#e67e22] underline' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#e67e22] dark:text-white md:dark:hover:text-[#e67e22] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>
                Perfil
              </Link>
            </li>
            
            {isLoggedIn && (
              <li className="w-full md:w-auto">
                <Link to={"/"} onClick={logout} className="w-full block text-left py-2 px-3 text-white bg-red-600 rounded md:bg-transparent md:text-red-600 md:p-0 md:hover:text-[#e67e22] dark:text-white md:dark:hover:text-[#e67e22] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  <span className='flex gap-3'><LogOut /> Cerrar sesión</span>
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/account" className={`block py-2 px-3 rounded md:p-0 ${isActive('/account') ? 'text-[#e67e22] underline' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#e67e22] dark:text-white md:dark:hover:text-[#e67e22] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'}`}>
                  <span className='flex gap-3'><UserRound /> Gestionar cuenta</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
