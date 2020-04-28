import React, { useState, useRef, useEffect } from "react";
import { Row } from "antd";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import ImageBackground from "components/ImageBackground";
import backgroundImage from "assets/images/bg.svg";
import { clearError } from "./actions/auth.actions";

import SignInTab from "./components/SignIn/SignInTab";
import SignUpTab from "./components/SignUp/SingUpTab";
import ResetPasswordTab from "./components/ResetPassword/ResetPasswordTab";

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
      case "reset":
        return <ResetPasswordTab />;
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
    const ref = cardRef.current;
    ref && cardRef.current.addEventListener("transitionend", handleTransition);
    return () => {
      ref.removeEventListener("transitionend", handleTransition);
    };
  }, []);

  useEffect(() => {
    setRendering(true);
    dispatch(clearError());
  }, [params.type, dispatch]);

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
