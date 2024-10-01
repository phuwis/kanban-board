import { AreaChartOutlined, ProjectOutlined } from "@ant-design/icons";
import { Card, Row, Col, Button, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Homepage = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <Typography.Title level={1}>{t("welcome")} KANBAN Board</Typography.Title>
      <Typography style={{ fontSize: "24px" }}>{t("sub-welcome")}</Typography>
      <Row gutter={16} justify="center" style={{ marginTop: "50px" }}>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <AreaChartOutlined
                style={{ fontSize: "64px", padding: "20px", color: "#8fabfb" }}
              />
            }
          >
            <h2>{t("analytics")}</h2>
            <p>{t("view-statistics")}</p>
            <Link to="/analytic">
              <Button type="primary" block>
                {t("go-to") + " " + t("analytic")}
              </Button>
            </Link>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={
              <ProjectOutlined
                style={{ fontSize: "64px", padding: "20px", color: "#6ddba6" }}
              />
            }
          >
            <h2>{t("task-board")}</h2>
            <p>{t("manage-tasks")}</p>
            <Link to="/board">
              <Button type="primary" block>
                {t("go-to") + " " + t("board")}
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
