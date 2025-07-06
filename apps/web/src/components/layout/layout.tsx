import { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => (
  <>
    <Navbar className={className} />
    {children}
    <Footer />
  </>
);
