import { ReactNode } from "react";
import { LayoutFooter, LayoutNavbar } from ".";
import { LayoutNotification } from "~/components/layout/layout-notification";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNotification />
    <LayoutNavbar />
    {children}
    <LayoutFooter />
  </>
);
