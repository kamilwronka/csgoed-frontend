import React, { useEffect } from "react";

function AccountPage() {
  useEffect(() => {
    document.title = "Account - shopn.io";
  }, []);

  return <div>account</div>;
}

export default AccountPage;
