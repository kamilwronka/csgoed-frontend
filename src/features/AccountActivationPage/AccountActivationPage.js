import React, { useEffect } from "react";
import { Alert, Button } from "antd";
import { useLocation } from "react-router-dom";
import { parse } from "qs";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import { activateAccount } from "./actions/accountActivation.actions";

function AccountActivationPage() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { token } = parse(search.substring(1));
  const { data, error, fetching, intact } = useSelector(
    state => state.accountActivation
  );

  const successMessage = get(data, "message");
  const errorMessage = get(error, "data.message");

  useEffect(() => {
    dispatch(activateAccount(token));
  }, [token, dispatch]);

  useEffect(() => {
    document.title = "Activate account - csgoed.com";
  }, []);

  return (
    <Alert
      message={
        fetching || intact
          ? "Activating account..."
          : successMessage || errorMessage
      }
      description={
        successMessage ? <Button type="link">Continue</Button> : null
      }
    />
  );
}

export default AccountActivationPage;
