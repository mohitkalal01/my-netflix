import Navbar from "./Navbar";
import Footer from "./Footer";
import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-brand-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
