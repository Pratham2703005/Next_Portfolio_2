'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Timeline', path: '/timeline' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="transition-all duration-300 select-none bg-transparent z-50 relative"
    >
      <div className="w-full mx-auto ">
        <div className="flex items-center justify-between h-16 max-w-[90%] mx-auto">
        <div className='flex gap-3 md:gap-5 items-center justify-center'>
      
      <Link href="/" className="flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-bold text-white hover:text-gray-300 transition duration-300">
          pratham
        </h1>
      </Link>
    </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="relative flex items-center ml-10 space-x-8">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  onMouseEnter={() => setActiveItem(item.path)}
                  onMouseLeave={() => setActiveItem(pathname)}
                >
                  <motion.div
                    className="relative py-1 px-1"
                    whileHover={{
                      color: '#ffffff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '4px',
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span
                      className={`uppercase text-sm font-light transition-colors duration-200 ${activeItem === item.path ? 'text-white' : 'text-gray-400'
                        }`}
                    >
                      {item.name}
                    </span>
                    {activeItem === item.path && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-white"
                        layoutId="activeNavIndicator"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none md:hidden"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute inset-x-0 top-16 bg-black bg-opacity-90 backdrop-blur-sm py-3 rounded-b-lg shadow-xl z-50"
        >
          <div className="px-4 pt-2 flex flex-col">
            {/* Navigation Items */}
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`${activeItem === item.path
                    ? 'text-white border-l-2 border-white'
                    : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10'
                  } px-3 py-2 text-base uppercase font-light rounded-md transition duration-150`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;