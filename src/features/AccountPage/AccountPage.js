import React, { useEffect } from "react";

function AccountPage() {
  useEffect(() => {
    document.title = "Account - csgoed.com";
  }, []);

  return <div>account</div>;
}

export default AccountPage;
