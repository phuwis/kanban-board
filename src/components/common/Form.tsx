import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import { Form, Input, Button, message, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

interface FormProps {
  getNewTask: (task: {
    id: string;
    title: string;
    user: string;
    columnId: number;
  }) => void;
}

interface TaskState {
  taskTitle: string;
  user: string;
}

interface ActionType {
  type: string;
  element?: HTMLInputElement;
}

const TaskForm: React.FC<FormProps> = ({ getNewTask }) => {
  const init: TaskState = { taskTitle: "", user: "" };
  const { t } = useTranslation();

  const reducer = (state: TaskState, action: ActionType): TaskState => {
    switch (action.type) {
      case "reset":
        return init;
      case "change":
        if (action.element) {
          const { name, value } = action.element;
          return { ...state, [name]: value };
        }
        return state;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init);
  const { taskTitle, user } = state;

  const formValidation = (errors: string[]) => {
    if (taskTitle.length < 2) errors.push("Task name is required");
    if (user.length < 2) errors.push("User name is required");
  };

  const addTask = () => {
    const newTask = {
      id: uuid(),
      title: taskTitle,
      user,
      columnId: 1,
    };

    const errors: string[] = [];
    formValidation(errors);

    if (errors.length === 0) {
      getNewTask(newTask);
      dispatch({ type: "reset" });
      message.success("Task added successfully!");
    } else {
      message.error(errors.join(",\n "));
    }
  };

  return (
    <Form layout="vertical" onFinish={addTask}>
      <Row gutter={12} align={"bottom"}>
        <Col>
          <Form.Item
            label={t("task-title")}
            rules={[{ required: true, message: t("validate-task-title") }]}
          >
            <Input
              name="taskTitle"
              value={taskTitle}
              onChange={(e) => dispatch({ type: "change", element: e.target })}
              placeholder={t("place-task-title")}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label={t("create-by")}
            rules={[
              { required: true, message: t("validate-create-by") },
              {
                pattern: /^[a-zA-Z –-]+$/,
                message: "User name must contain only letters",
              },
            ]}
          >
            <Input
              name="user"
              value={user}
              onChange={(e) => dispatch({ type: "change", element: e.target })}
              placeholder={t("place-create-by")}
            />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {t("add-task")}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
