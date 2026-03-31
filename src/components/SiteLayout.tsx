import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

const SiteLayout = ({ children }: { children: ReactNode }) => (
  <>
    <SiteHeader />
    {children}
    <SiteFooter />
  </>
);

export default SiteLayout;
