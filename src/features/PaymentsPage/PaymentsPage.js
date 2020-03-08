import React, { useEffect } from "react";

import TopUpBalanceForm from "./components/TopUpBalanceForm";
import AccountBalance from "./components/Balance";
import { useDispatch } from "react-redux";
import { fetchUserPayments } from "./actions/payment.actions";
import { Row, Col } from "antd";

function PaymentsPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPayments());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Billing and payments - csgoed.com";
  }, []);

  return (
    <Row type="flex" justify="space-between">
      <Col xs={24} md={10}>
        <AccountBalance />
      </Col>
      <Col xs={24} md={10}>
        <TopUpBalanceForm />
      </Col>
    </Row>
  );
}

export default PaymentsPage;
