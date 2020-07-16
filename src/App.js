import React from "react";
import Navigation from "navigation";

import "i18n";
import "antd/dist/antd.css";
import "./App.css";
import "simplebar/dist/simplebar.min.css";
import AuthProvider from "providers/AuthProvider";
import UserDataProvider from "providers/UserDataProvider";

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <Navigation />
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
