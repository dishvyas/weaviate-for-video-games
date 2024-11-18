// src/components/Navbar.tsx
import React, { useContext, useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/Navbar.module.css';



const Navbar: React.FC = () => {
  const router = useRouter();

  const [ scrolled, setScrolled ] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        setScrolled(scrollTop > 50); // Toggle scrolled state when scrolling 50px
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ''}`}>
      <div className={styles.logo}> <Link href="/" className={router.pathname === '/' ? styles.active : ''}>GAMEZONE</Link></div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={router.pathname === '/' ? styles.active : ''}>
            HOME
          </Link>
        </li>
        <li>
          <Link href="/GameLibrary" className={router.pathname === '/GameLibrary' ? styles.active : ''}>
            GAME LIBRARY
          </Link>
        </li>
      </ul>
      {/* <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search games..."
          className={styles.searchInput}
          // onChange={handleSearch}
        />
      </div> */}
    </nav>
  );
};

export default Navbar;