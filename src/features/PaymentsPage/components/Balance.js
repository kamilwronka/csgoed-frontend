import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { Card, Typography } from "antd";

function AccountBalance() {
  const { data: paymentsData, fetching, intact } = useSelector(
    (state) => state.paymentsPage.payments
  );

  return (
    <div className="card">
      <div>
        <Typography.Title level={4}>Active servers</Typography.Title>
      </div>
      {/* <strong>Balance: {get(paymentsData, "balance", 0).toFixed(2)}</strong>
      <br />
      <strong> Currency: {get(paymentsData, "currency")}</strong> */}
    </div>
  );
}

export default AccountBalance;
