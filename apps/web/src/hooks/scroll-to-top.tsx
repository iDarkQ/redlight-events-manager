import { ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router";

type ScrollToTopProps = { children: ReactNode };

export default function ScrollToTop({ children }: ScrollToTopProps) {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return <>{children}</>;
}
