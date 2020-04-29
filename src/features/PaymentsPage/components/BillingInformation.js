import React from "react";
import { Typography, List, Tag, Divider, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { get } from "lodash";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function BillingInformation({ handleAddFundsForm }) {
  const { t } = useTranslation();
  const { data: paymentsData, fetching } = useSelector(
    (state) => state.paymentsPage.payments
  );

  return (
    <div className="card">
      <div>
        <Typography.Title level={4}>
          {t("pages.paymentsPage.billingInformation")}
        </Typography.Title>
      </div>
      <List
        size={"small"}
        dataSource={[
          {
            title: t("pages.paymentsPage.balance"),
            amount: get(paymentsData, "balance", 0).toFixed(2),
            key: 2,
            component: (
              <Tag onClick={handleAddFundsForm} color="#87d068">
                {t("pages.paymentsPage.addFunds")}
              </Tag>
            ),
          },
        ]}
        renderItem={(item) => {
          return (
            <li
              key={item.key}
              style={{
                width: "100%",
                height: 36,
                margin: 0,
                padding: "6px 16px 6px 16px",
                fontWeight: "500",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                {item.title}: {fetching ? <Spin /> : "$" + item.amount}
              </span>
              {item.component}
            </li>
          );
        }}
      />
      <div>
        <Divider style={{ marginBottom: 0 }} />
        <div style={{ padding: 16, fontWeight: "500" }}>
          <Link to="/payments/history">
            <ArrowRightOutlined /> {t("pages.paymentsPage.goToDepositHistory")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BillingInformation;
