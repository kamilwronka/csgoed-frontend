import { useContext } from "react";
import { LayoutContext } from "components/AppLayout/Layout/Layout";

export default function useLayout() {
  return useContext(LayoutContext);
}
