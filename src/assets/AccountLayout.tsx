import React from 'react';
import Footer from '@/components/shared/Footer';
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer/>
    </>
  );
};

export default MainLayout;
