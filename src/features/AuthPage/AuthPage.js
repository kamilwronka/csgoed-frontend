import React, { useState, useRef, useEffect } from "react";
import { Row } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import ImageBackground from "components/ImageBackground";
import backgroundImage from "assets/images/bg.svg";

import SignInTab from "./components/SignIn/SignInTab";
import SignUpTab from "./components/SignUp/SingUpTab";
import { clearError } from "./actions/auth.actions";

function AuthPage() {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();
  const cardRef = useRef(null);
  const [rendering, setRendering] = useState(false);

  const renderTab = () => {
    switch (params.type) {
      case "signup":
        return <SignUpTab />;
      case "signin":
        return <SignInTab />;
      default:
        history.push(`/auth/signin${location.search}`);
    }
  };

  const getHeight = () => {
    switch (params.type) {
      case "signup":
        return 690 + 48;
      case "signin":
        return 478 + 48;
      default:
        return 300;
    }
  };

  const handleTransition = (e) => {
    if (e.propertyName === "min-height") {
      setRendering(false);
    }
  };

  useEffect(() => {
    cardRef.current &&
      cardRef.current.addEventListener("transitionend", handleTransition);
    return () => {
      cardRef.current.removeEventListener("transitionend", handleTransition);
    };
  }, []);

  useEffect(() => {
    setRendering(true);
    dispatch(clearError());
  }, [params.type]);

  return (
    <Row justify="center" type="flex" align="middle">
      <ImageBackground
        src={backgroundImage}
        style={{
          width: "100vw",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: 150,
            paddingBottom: 150,
          }}
        >
          <div
            ref={cardRef}
            className="card"
            style={{
              padding: "48px 0 0 0",
              width: "100%",
              maxWidth: 448,
              boxShadow: "0px 3px 15px 1px rgba(0,0,0,0.75)",
              minHeight: getHeight(),
            }}
          >
            <div className={`appear ${rendering ? "animate" : ""}`}>
              {renderTab()}
            </div>
          </div>
        </div>
      </ImageBackground>
    </Row>
  );
}

export default AuthPage;
