import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='min-h-screen m-0 overflow-x-hidden'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
