import React from "react";
import Task from "./Task";
import { TaskContext } from "../../contexts";
import { Flex } from "antd";
import { t } from "i18next";

interface TaskType {
  id: number;
  title: string;
  user: string;
  columnId: number;
}

interface ContextType {
  tasks: TaskType[];
  moveTask: any;
  moveBackTask: any;
  removeTask: any;
}

interface ColumnProps {
  columnTitle: string;
  className: string;
  limit: number;
  id: number;
}

export default class Column extends React.Component<ColumnProps> {
  render() {
    const { Consumer: TaskConsumer } = TaskContext;

    const { columnTitle, limit, className } = this.props;

    return (
      <div className={className}>
        <h2>{columnTitle}</h2>
        <TaskConsumer>
          {(context: ContextType | undefined) => {
            const taskCount = context.tasks.filter(
              (task) => task.columnId === this.props.id
            ).length;

            return (
              <>
                <Flex justify="end">
                  <p>
                    {t("count-task")} {taskCount} / {limit}
                  </p>
                </Flex>
                {this.generateTaskList(context)}
              </>
            );
          }}
        </TaskConsumer>
      </div>
    );
  }

  generateTaskList = (context: ContextType) => {
    const { id } = this.props;
    return context.tasks
      .filter((task) => task.columnId === id)
      .map((task) => (
        <Task
          key={task.id}
          item={task}
          moveTask={context.moveTask}
          moveBackTask={context.moveBackTask}
          removeTask={context.removeTask}
        />
      ));
  };
}
