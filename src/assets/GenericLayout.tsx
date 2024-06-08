import React from "react";
import Header from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen m-0 relative grid grid-rows-[auto_1fr_auto]">
        <Header />
        <main className="w-full flex justify-center">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
