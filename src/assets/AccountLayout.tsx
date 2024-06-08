import React from "react";
import Footer from "@/components/shared/Footer";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen m-0 relative grid grid-rows-[1fr_auto] w-full justify-center">
      <main className="mb-10">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
