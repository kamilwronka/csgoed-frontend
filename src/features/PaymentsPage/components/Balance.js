import React from "react";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { Card } from "antd";

function AccountBalance() {
  const { data: paymentsData, fetching, intact } = useSelector(
    state => state.paymentsPage.payments
  );

  return (
    <Card bordered={false} title="Account details" loading={fetching || intact}>
      <strong>Balance: {get(paymentsData, "balance", 0).toFixed(2)}</strong>
      <br />
      <strong> Currency: {get(paymentsData, "currency")}</strong>
    </Card>
  );
}

export default AccountBalance;
