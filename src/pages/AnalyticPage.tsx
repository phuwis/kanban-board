import {
  Card,
  Col,
  Empty,
  Row,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import TaskBarChart from "src/components/common/TaskBarChart";
import TaskPieChart from "src/components/common/TaskPieChart";

const { Title } = Typography;

interface TaskType {
  id: number;
  title: string;
  user: string;
  columnId: number;
}

const columnsData = [
  { id: 1, title: "To do", key: "todo", className: "column col_first" },
  {
    id: 2,
    title: "In progress",
    key: "inProgress",
    className: "column col_second",
  },
  { id: 3, title: "Review", key: "review", className: "column col_third" },
  { id: 4, title: "Done", key: "done", className: "column col_fourth" },
];

export const AnalyticPage = () => {
  const context = JSON.parse(localStorage.getItem("task"));

  const { t } = useTranslation();

  const taskCounts = {
    todo: context.filter((task: TaskType) => task.columnId === 1).length,
    inProgress: context.filter((task: TaskType) => task.columnId === 2).length,
    review: context.filter((task: TaskType) => task.columnId === 3).length,
    done: context.filter((task: TaskType) => task.columnId === 4).length,
  };

  const tableColumns: TableColumnsType = [
    { title: t("title"), dataIndex: "title", key: "title" },
    { title: t("id"), dataIndex: "id", key: "id" },
    { title: t("user"), dataIndex: "user", key: "user" },
    {
      title: t("status"),
      dataIndex: "columnId",
      align: "center",
      key: "status",
      render: (columnId: number) => {
        const column = columnsData.find((col) => col.id === columnId);
        return (
          <Tag color={handleColorStatus(column.id)}>
            {handleTextStatus(column.id)}
          </Tag>
        );
      },
    },
  ];

  const handleColorStatus = (id: number) => {
    switch (id) {
      case 1:
        return "#d671ae";
      case 2:
        return "#ffbd0a";
      case 3:
        return "#8fabfb";
      case 4:
        return "#6ddba6";

      default:
        return "#e4e8f0";
    }
  };

  const handleTextStatus = (id: number) => {
    switch (id) {
      case 1:
        return t("todo");
      case 2:
        return t("in-progress");
      case 3:
        return t("review");
      case 4:
        return t("done");

      default:
        return "";
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>{t("task-analytics")}</Title>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Card
            title={t("todo")}
            style={{ borderTop: "4px solid #d671ae", borderTopWidth: "5px" }}
          >
            <Title level={3}>{taskCounts.todo}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={t("in-progress")}
            style={{ borderTop: "4px solid #ffbd0a", borderTopWidth: "5px" }}
          >
            <Title level={3}>{taskCounts.inProgress}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={t("review")}
            style={{ borderTop: "4px solid #8fabfb", borderTopWidth: "5px" }}
          >
            <Title level={3}>{taskCounts.review}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={t("done")}
            style={{ borderTop: "4px solid #6ddba6", borderTopWidth: "5px" }}
          >
            <Title level={3}>{taskCounts.done}</Title>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="">
            <TaskPieChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="">
            <TaskBarChart />
          </Card>
        </Col>
      </Row>
      <Title level={2}>{t("tasks")}</Title>
      <Table
        columns={tableColumns}
        dataSource={context}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        locale={{
          emptyText: <Empty description={t("empty-data")} />,
        }}
      />
    </div>
  );
};
