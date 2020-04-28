import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

function Input(props) {
  const [type, setType] = useState(props.type);

  const renderIcon = () => {
    if (props.type === "password") {
      return type === "password" ? <EyeOutlined /> : <EyeInvisibleOutlined />;
    }
  };

  const handleTypeChange = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="input-container" style={{ position: "relative" }}>
      <input {...props} type={type} className="input" />
      <div
        onClick={handleTypeChange}
        style={{
          position: "absolute",
          right: 12,
          top: 8,
          height: 44,
          lineHeight: "44px",
          cursor: "pointer",
        }}
      >
        {renderIcon()}
      </div>
    </div>
  );
}

export default Input;
