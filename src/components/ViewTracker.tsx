import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackView } from "@/lib/track-view";

export default function ViewTracker() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    trackView(pathname + search);
  }, [pathname, search]);
  return null;
}
