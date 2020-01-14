import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <Link to="/auth/signin">Zaloguj się</Link>
      <Link to="/auth/signup">Zarejestruj się</Link>
    </div>
  );
}

export default MainPage;
