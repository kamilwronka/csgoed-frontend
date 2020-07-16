import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isNil } from "lodash";

import LayoutInner from "./LayoutInner";
import useAuth from "hooks/useAuth";
import useUserData from "hooks/useUserData";

export const LayoutContext = React.createContext({
  siderOpen: false,
  mobile: false,
});

function Layout({ children, ...props }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [value, setValue] = useState({ siderOpen: false, mobile: false });
  const { state } = useAuth();
  const { fetchUserData, data } = useUserData();

  const setMobile = (val) => {
    setValue({ ...value, mobile: val });
  };

  const toggleSider = (val) => {
    setValue({ ...value, siderOpen: !value.siderOpen });
  };

  const disableSider = (val) => {
    setValue({ ...value, siderOpen: false });
  };

  useEffect(() => {
    fetchUserData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, t]);

  return (
    <LayoutContext.Provider
      value={{ ...value, setMobile, toggleSider, disableSider }}
    >
      <LayoutInner {...props}>{children}</LayoutInner>
    </LayoutContext.Provider>
  );
}

export default Layout;
