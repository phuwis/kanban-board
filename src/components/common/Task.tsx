import {
  LeftOutlined,
  RightOutlined,
  UpOutlined,
  DownOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import React from "react";
import { Button, Typography, Card, Flex, Col } from "antd";
import { useTranslation } from "react-i18next";

const { Text, Title } = Typography;

interface TaskProps {
  item: {
    id: number;
    title: string;
    user: string;
    columnId: number;
  };
  moveTask: (task: {
    id: number;
    title: string;
    user: string;
    columnId: number;
  }) => void;
  moveBackTask: (task: {
    id: number;
    title: string;
    user: string;
    columnId: number;
  }) => void;
  removeTask: (task: {
    id: number;
    title: string;
    user: string;
    columnId: number;
  }) => void;
}

const Task: React.FC<TaskProps> = ({
  item: task,
  moveTask,
  moveBackTask,
  removeTask,
}) => {
  const { title, user, columnId } = task;
  const { t } = useTranslation();

  return (
    <Card bordered style={{ marginBottom: "16px" }}>
      <Flex justify="space-between">
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => removeTask(task)}
          style={{ color: "red", marginLeft: "auto" }}
        />
      </Flex>
      <Flex justify="start">
        <Text>
          {t("create-by")} : {user}
        </Text>
      </Flex>
      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Flex justify="space-between">
          {columnId !== 1 && (
            <Button
              icon={<LeftOutlined />}
              onClick={() => moveBackTask(task)}
              className="btn_desktop"
            />
          )}
          {columnId === 1 && <Col />}
          {columnId !== 4 && (
            <Button
              icon={<RightOutlined />}
              onClick={() => moveTask(task)}
              className="btn_desktop"
            />
          )}
          {columnId === 4 && <Col />}
          {columnId !== 1 && (
            <Button
              icon={<UpOutlined />}
              onClick={() => moveBackTask(task)}
              className="btn_mobile"
            />
          )}
          {columnId !== 4 && (
            <Button
              icon={<DownOutlined />}
              onClick={() => moveTask(task)}
              className="btn_mobile"
            />
          )}
        </Flex>
      </div>
    </Card>
  );
};

export default Task;
