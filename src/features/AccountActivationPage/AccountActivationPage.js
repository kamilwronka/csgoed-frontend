import React, { useEffect, useState } from "react";
import { Alert, Button } from "antd";
import { useLocation } from "react-router-dom";
import { parse } from "qs";

import Axios from "axios";
import { API_CONFIG } from "config";

function AccountActivationPage() {
  const [state, setState] = useState();
  const [error, setError] = useState();
  const [fetching, setFetching] = useState();

  const { search } = useLocation();
  const { token } = parse(search.substring(1));

  useEffect(() => {
    setFetching(true);
    Axios.post(API_CONFIG.API_URL + "/activate", { token })
      .then((response) => {
        setState(response.data);
      })
      .catch((error) => setError(error.response.data.message))
      .finally(() => {
        setFetching(false);
      });
  }, [token]);

  useEffect(() => {
    document.title = "Activate account - shopn.io";
  }, []);

  return (
    <Alert
      message={
        fetching
          ? "Activating account..."
          : error || "Account has been activated."
      }
      description={state ? <Button type="link">Continue</Button> : null}
    />
  );
}

export default AccountActivationPage;
