import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Form, Input, Card, Button, notification } from "antd";
import { get } from "lodash";

import { STRIPE_KEY } from "config";
import { useUserData } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { handleStripePayment } from "../actions/payment.actions";
import { openNotificationWithIcon } from "helpers/openNotification";

function TopUpBalanceForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const { data: userData } = useUserData();
  const { data: paymentData, error: paymentError, fetching } = useSelector(
    state => state.paymentsPage.stripePayment
  );

  const paymentDataMessage = get(paymentData, "message");
  const paymentErrorMessage = get(paymentError, "data.message");

  const handleChange = e => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    setAmount((value / 100).toFixed(2));
  };

  const onReceiveToken = data => {
    dispatch(handleStripePayment(data, amount));
  };

  useEffect(() => {
    fetching && openNotificationWithIcon("info", "Payment in progress...");
  }, [fetching]);

  useEffect(() => {
    notification.destroy();
    paymentDataMessage &&
      openNotificationWithIcon("success", "Payment", paymentDataMessage);
  }, [paymentDataMessage]);

  useEffect(() => {
    notification.destroy();
    paymentErrorMessage &&
      openNotificationWithIcon("error", "Payment", paymentErrorMessage);
  }, [paymentErrorMessage]);

  return (
    <Card bordered={false} title={"Add funds to your account:"}>
      <Form>
        <Form.Item label="Amount">
          <Input
            name="amount"
            value={amount}
            type="number"
            min="1"
            step="0.01"
            onChange={handleChange}
            addonAfter={"PLN"}
          />
        </Form.Item>
        <Form.Item>
          <StripeCheckout
            amount={amount * 100}
            currency="PLN"
            stripeKey={STRIPE_KEY}
            token={onReceiveToken}
            email={get(userData, "email")}
            description={`Top up your balance for ${amount}zł.`}
            alipay
            bitcoin
            name="csgoed.com"
          >
            <Button type="primary">Continue</Button>
          </StripeCheckout>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default TopUpBalanceForm;
