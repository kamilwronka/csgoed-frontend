import React, { useEffect, useContext, useState } from "react";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LayoutInner from "./LayoutInner";

export const LayoutContext = React.createContext({
  siderOpen: false,
  mobile: false
});

function Layout({ children }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [value, setValue] = useState({ siderOpen: false, mobile: false });

  const setMobile = val => {
    setValue({ ...value, mobile: val });
  };

  const toggleSider = val => {
    setValue({ ...value, siderOpen: !value.siderOpen });
  };

  const disableSider = val => {
    setValue({ ...value, siderOpen: false });
  };

  console.log(value);

  useEffect(() => {
    window.document.title = t(`menu.${pathname.substr(1)}`) + " - csgoed.com";
  }, [pathname, t]);

  return (
    <LayoutContext.Provider
      value={{ ...value, setMobile, toggleSider, disableSider }}
    >
      <LayoutInner>{children}</LayoutInner>
    </LayoutContext.Provider>
  );
}

export default Layout;
