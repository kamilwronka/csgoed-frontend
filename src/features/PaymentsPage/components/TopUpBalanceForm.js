import React, { useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Form, Input, Card, Button } from "antd";
import { get } from "lodash";

import { STRIPE_KEY } from "config";
import { useUserData } from "hooks";
import { useDispatch } from "react-redux";
import { handleStripePayment } from "../actions/payment.actions";

function TopUpBalanceForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const { data: userData } = useUserData();

  const handleChange = e => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    setAmount((value / 100).toFixed(2));
  };

  const onReceiveToken = data => {
    dispatch(handleStripePayment(data, amount));
  };

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
