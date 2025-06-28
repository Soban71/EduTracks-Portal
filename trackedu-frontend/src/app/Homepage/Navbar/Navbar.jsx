'use client';

import Link from 'next/link';
import styles from './navbar.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('studentFirstName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('studentFirstName');
    localStorage.removeItem('studentToken'); // in case you saved token
    setUserName('');
    router.push('/');
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.logo}>TrackEdu</h1>

      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>Home</Link>
        <Link href="/Homepage/About" className={styles.link}>About</Link>
        <Link href="/Homepage/Contact" className={styles.link}>Contact</Link>
        <Link href="/Homepage/StudentNote" className={styles.link}>Download Notes</Link>

        {userName ? (
          <div className="flex items-center gap-4">
            <span className="text-white font-medium">Welcome, {userName}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-lg shadow hover:shadow-lg transition-all duration-300"
            onClick={() => router.push('/Homepage/Authentication/login')}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
