import { ReactNode } from "react";
import { LayoutNotification } from "~/components/layout/layout-notification";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <>
    <LayoutNavbar />
    {children}
  </>
);
