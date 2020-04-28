import React from "react";

function ImageBackground({ children, style, ...props }) {
  return (
    <div
      style={{
        ...style,
        position: "relative",
        backgroundColor: "#001529",
        backgroundImage: `url(${props.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      {children}
    </div>
  );
}

export default ImageBackground;
