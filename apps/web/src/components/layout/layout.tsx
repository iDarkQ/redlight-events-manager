import { ReactNode } from "react";
import { LayoutNavbar } from ".";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNavbar />
    {children}
  </>
);
