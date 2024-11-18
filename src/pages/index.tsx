// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Navbar from '@/components/Navbar';
import '../app/globals.css';
// import app from 'weaviate-client';

const Home: React.FC = () => {
  return (
    <>
    <Navbar />
    <div className="bg-gradient-to-tr">
      <div className={styles.landingContainer}>
        <h1 className={styles.title}>Welcome to GameZone</h1>
        <p className={styles.subtitle}>Explore the Ultimate Library of Video Games!</p>
        <Link href="/GameLibrary">
          <button className={styles.ctaButton}>Explore Now</button>
        </Link>
      </div>
    </div>
     </>
  );
};

export default Home;