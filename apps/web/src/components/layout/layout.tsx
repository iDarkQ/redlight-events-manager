import { ReactNode } from "react";
import { LayoutFooter, LayoutNavbar } from ".";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNavbar />
    {children}
    <LayoutFooter />
  </>
);
