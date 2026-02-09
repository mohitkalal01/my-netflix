import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-brand-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pb-mobile-nav md:pb-0">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Footer />
      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
};

export default MainLayout;
