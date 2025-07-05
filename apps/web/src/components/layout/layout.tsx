import { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);
