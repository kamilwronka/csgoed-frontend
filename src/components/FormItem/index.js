import React from "react";
import { Col } from "antd";
import { isEmpty } from "lodash";

function FormItem({
  children,
  label,
  name,
  help,
  additionalLabel,
  style,
  validateStatus,
}) {
  return (
    <Col className="form-item" xs={20} offset={2} style={{ marginTop: 24 }}>
      <div
        style={{
          ...style,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <label htmlFor={name} style={{ fontWeight: 600 }}>
          {label}
        </label>
        <p style={{ fontWeight: 700, margin: 0, padding: 0 }}>
          {additionalLabel}
        </p>
      </div>
      <div className={validateStatus}>{children}</div>
      <p
        className={`input-help ${!isEmpty(help) ? "show" : ""}`}
        style={{ color: "red", fontWeight: 600 }}
      >
        {help}
      </p>
    </Col>
  );
}

export default FormItem;
