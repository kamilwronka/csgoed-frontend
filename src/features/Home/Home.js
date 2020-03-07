import React from "react";
import { Row, Typography, Divider, Col, Tooltip, List, Tag } from "antd";
import {
  SyncOutlined,
  LoadingOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { get } from "lodash";

import { useUserData } from "hooks";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

function Home() {
  const { data: userData, fetching, intact } = useUserData();

  return (
    <>
      <Row>
        <Col
          xs={24}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Title level={3}>Welcome, {get(userData, "name")}!</Title>
          <div style={{ fontSize: "1.2rem", color: "#000", cursor: "pointer" }}>
            <Tooltip title="Refresh data">
              {fetching || intact ? (
                <LoadingOutlined style={{ marginRight: 8 }} />
              ) : (
                <SyncOutlined style={{ marginRight: 8 }} />
              )}
            </Tooltip>
          </div>
        </Col>
        <Divider style={{ background: "#ccc", marginTop: 0 }} />
      </Row>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={24} lg={12} xl={8} xxl={6}>
          <div className="card">
            <div>
              <Title level={4}>Active servers</Title>
              <List
                size={"small"}
                dataSource={[
                  { title: "Teamspeak 3", amount: 3, key: 2 },
                  { title: "CS:GO", amount: 2, key: 1 }
                ]}
                renderItem={item => {
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
                        justifyContent: "space-between"
                      }}
                    >
                      {item.title}: <Tag color="#f50">{item.amount}</Tag>
                    </li>
                  );
                }}
              />
            </div>
            <div>
              <Divider style={{ marginBottom: 0 }} />
              <div style={{ padding: 16, fontWeight: "500" }}>
                <Link to="/servers">
                  <ArrowRightOutlined /> Go to servers
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} lg={12} xl={8} xxl={6}>
          <div className="card">
            <div>
              <Title level={4}>Estimated costs</Title>
            </div>
            <div>
              <Divider style={{ marginBottom: 0 }} />
              <div style={{ padding: 16, fontWeight: "500" }}>
                <Link to="/payments">
                  <ArrowRightOutlined /> Go to billing and payments
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} xl={8} xxl={6}>
          <div className="card success">
            <div>
              <Title level={4}>Platform status</Title>
              <Text style={{ padding: "0 16px 0 16px" }}>
                All services are working.
              </Text>
            </div>
            <div>
              <Divider style={{ marginBottom: 0 }} />
              <div style={{ padding: 16, fontWeight: "500" }}>
                <Link to="/platform-status">
                  <ArrowRightOutlined /> Go to platform status panel
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} xl={8} xxl={6}>
          <div className="card">
            <div>
              <Title level={4}>Messages</Title>
            </div>
            <div>
              <Divider style={{ marginBottom: 0 }} />
              <div style={{ padding: 16, fontWeight: "500" }}>
                <Link to="/payments">
                  <ArrowRightOutlined /> Go to messages
                </Link>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} xl={8} xxl={6}>
          <div className="card">
            <div>
              <Title level={4}>Documentation</Title>
            </div>
            <div>
              <Divider style={{ marginBottom: 0 }} />
              <div style={{ padding: 16, fontWeight: "500" }}>
                <Link to="/docs">
                  <ArrowRightOutlined /> Go to documentation
                </Link>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Home;
