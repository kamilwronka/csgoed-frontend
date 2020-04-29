import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { CardElement, useStripe, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Form,
  Card,
  Button,
  notification,
  Divider,
  Checkbox,
  Radio,
} from "antd";
import { get } from "lodash";

import { STRIPE_KEY } from "config";
import { useUserData } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import { handleStripePayment } from "../actions/payment.actions";
import { openNotificationWithIcon } from "helpers/openNotification";
import FormItem from "components/FormItem";
import Input from "components/Input";
import { Formik, Field } from "formik";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "rgba(0, 0, 0, 0.65)",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#ccc" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

function TopUpBalanceForm() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("0");
  const [stripe, setStripe] = useState(null);
  const { data: userData } = useUserData();
  const { data: paymentData, error: paymentError, fetching } = useSelector(
    (state) => state.paymentsPage.stripePayment
  );

  const paymentDataMessage = get(paymentData, "message");
  const paymentErrorMessage = get(paymentError, "data.message");

  const INITIAL_VALUES = {
    name: "Kamil",
    email: userData.email,
    phoneNumber: "+48786220334",
    amount: "0.00",
    paymentData: "existing",
  };

  const formatAmount = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    return (value / 100).toFixed(2);
  };

  const handleCardChange = (e) => {
    console.log(e);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    console.log(e);
  };

  const onReceiveToken = (data) => {
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

  useEffect(() => {
    setStripe(loadStripe(STRIPE_KEY));
  }, []);

  return (
    <Formik onSubmit={handleSubmit} initialValues={INITIAL_VALUES}>
      {({ values, errors, setFieldValue, onSubmit }) => {
        console.log(values);
        return (
          <Elements stripe={stripe}>
            <form onSubmit={onSubmit}>
              <FormItem
                label="Amount"
                name="amount"
                validateStatus={""}
                help=""
              >
                <Field
                  name="amount"
                  type="number"
                  as={Input}
                  onChange={(e) => setFieldValue("amount", formatAmount(e))}
                />
              </FormItem>
              <Divider />
              <FormItem>
                <Radio.Group
                  onChange={(e) => setFieldValue("paymentData", e.target.value)}
                  value={values.paymentData}
                >
                  <Radio value="existing">Use existing payment data</Radio>
                  <Radio value="new">Add new payment data</Radio>
                </Radio.Group>
              </FormItem>
              {values.paymentData === "existing" && (
                <div>current payment data</div>
              )}
              {values.paymentData === "new" && (
                <>
                  <FormItem
                    label="Name"
                    name="name"
                    validateStatus={""}
                    help=""
                  >
                    <Field name="name" type="text" as={Input} />
                  </FormItem>
                  <FormItem
                    label="Email"
                    name="email"
                    validateStatus={""}
                    help=""
                  >
                    <Field name="email" type="email" as={Input} />
                  </FormItem>
                  <FormItem
                    label="Phone number"
                    name="email"
                    validateStatus={""}
                    help=""
                  >
                    <Field name="phoneNumber" type="text" as={Input} />
                  </FormItem>

                  <FormItem label="Card details">
                    <div className="FormRow">
                      <CardElement
                        options={CARD_OPTIONS}
                        onChange={(value) => setFieldValue("card", value)}
                      />
                    </div>
                  </FormItem>
                  <FormItem>
                    <Checkbox>Save transaction data</Checkbox>
                  </FormItem>
                </>
              )}
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", height: 44 }}
                  disabled={values.amount <= 0}
                >
                  {values.amount > 0 ? `Pay $${values.amount}` : "Pay"}
                </Button>
              </FormItem>
            </form>
          </Elements>
        );
      }}
    </Formik>
  );
}

export default TopUpBalanceForm;
