import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { get } from "lodash";

import LayoutInner from "./LayoutInner";
import { fetchUserData } from "store/actions/user.actions";
import { useAuthData } from "hooks";

export const LayoutContext = React.createContext({
  siderOpen: false,
  mobile: false
});

function Layout({ children, ...props }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [value, setValue] = useState({ siderOpen: false, mobile: false });
  const dispatch = useDispatch();
  const { data: authData } = useAuthData();

  const token = get(authData, "token");

  const setMobile = val => {
    setValue({ ...value, mobile: val });
  };

  const toggleSider = val => {
    setValue({ ...value, siderOpen: !value.siderOpen });
  };

  const disableSider = val => {
    setValue({ ...value, siderOpen: false });
  };

  useEffect(() => {
    token && dispatch(fetchUserData());
  }, [dispatch, token]);

  useEffect(() => {
    window.document.title = t(`menu.${pathname.substr(1)}`) + " - csgoed.com";
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
