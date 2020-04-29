import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Row, Col, Drawer } from "antd";

import AddFundsForm from "./components/AddFundsForm";
import AccountBalance from "./components/Balance";
import { fetchUserPayments } from "./actions/payment.actions";
import BillingInformation from "./components/BillingInformation";
import useLayout from "hooks/useLayout";
import { useHistory } from "react-router-dom";

function PaymentsPage() {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { t } = useTranslation();
  const [showAddFundsModal, toggleAddFundsModal] = useState(
    window.location.href.includes("add-funds")
  );
  const { mobile } = useLayout();

  const handleAddFundsForm = () => {
    toggleAddFundsModal((prevState) => {
      const baseUrl = window.location.pathname + window.location.search;
      const url = !prevState ? baseUrl + "#add-funds" : baseUrl;
      push(url);
      return !prevState;
    });
  };

  useEffect(() => {
    dispatch(fetchUserPayments());
  }, [dispatch]);

  useEffect(() => {
    document.title = t("pages.paymentsPage.title");
  }, [t]);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={24} lg={12} xl={8} xxl={6}>
          {/* <AccountBalance /> */}
          <BillingInformation handleAddFundsForm={handleAddFundsForm} />
          {/* <TopUpBalanceForm /> */}
        </Col>
      </Row>
      <Drawer
        visible={showAddFundsModal}
        onClose={handleAddFundsForm}
        width={mobile ? "100%" : 600}
        title={t("pages.paymentsPage.addFundsFull")}
      >
        <AddFundsForm />
      </Drawer>
    </>
  );
}

export default PaymentsPage;
