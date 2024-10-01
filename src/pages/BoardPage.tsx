import React from "react";
import Board from "../components/common/Board.tsx";
import Form from "../components/common/Form.tsx";

interface ColumnType {
  id: number;
  title: string;
  limit: number;
  className: string;
}

interface TaskType {
  id: number;
  title: string;
  user: string;
  columnId: number;
}

import { TaskContext, ColumnContext } from "../contexts";
import { useTranslation } from "react-i18next";

export const BoardPage = () => {
  const { t } = useTranslation();

  const columns: ColumnType[] = [
    { id: 1, title: t("todo"), limit: 4, className: "column col_first" },
    {
      id: 2,
      title: t("in-progress"),
      limit: 2,
      className: "column col_second",
    },
    { id: 3, title: t("review"), limit: 3, className: "column col_third" },
    { id: 4, title: t("done"), limit: 4, className: "column col_fourth" },
  ];

  const tasksInMemory: TaskType[] = JSON.parse(
    localStorage.getItem("task") || "[]"
  );
  const [tasks, setTasks] = React.useState<TaskType[]>(tasksInMemory);

  React.useEffect(() => {
    localStorage.setItem("task", JSON.stringify(tasks));
  }, [tasks]);

  const setItem = (updatedTasks: TaskType[]) => {
    localStorage.setItem("task", JSON.stringify([...updatedTasks]));
    setTasks(JSON.parse(localStorage.getItem("task") || "[]"));
  };

  const moveTask: any = (task: TaskType) => {
    if (task.columnId === 4) return;
    let taskList = [...tasks];
    const nextCol = task.columnId + 1;
    const taskQty = taskList.filter((t) => t.columnId === nextCol).length;

    if (taskQty < columns[nextCol - 1].limit) {
      taskList.forEach((oldElement) => {
        if (oldElement.id === task.id) {
          oldElement.columnId++;
        }
      });
      setItem(taskList);
    } else {
      alert("The task limit in the column cannot be exceeded");
    }
  };

  const moveBackTask: any = (task: TaskType) => {
    if (task.columnId === 1) return;
    let taskList = [...tasks];
    const prevCol = task.columnId - 1;
    const taskQty = taskList.filter((t) => t.columnId === prevCol).length;

    if (taskQty < columns[prevCol - 1].limit) {
      taskList.forEach((oldElement) => {
        if (oldElement.id === task.id) {
          oldElement.columnId--;
        }
      });
      setItem(taskList);
    } else {
      alert("The task limit in the column cannot be exceeded");
    }
  };

  const getNewTask: any = (newTask: TaskType) => {
    const toDoTasks = tasks.filter((task) => task.columnId === 1).length;

    if (toDoTasks < columns[0].limit) {
      localStorage.setItem("task", JSON.stringify([...tasks, newTask]));
      setTasks(JSON.parse(localStorage.getItem("task") || "[]"));
    } else {
      alert("Task limit (4) cannot be exceeded");
    }
  };

  const removeTask: any = (task: TaskType) => {
    if (window.confirm("Are you sure you want to delete the task?")) {
      const tasksList = JSON.parse(localStorage.getItem("task") || "[]");
      const updateTasks = tasksList.filter(
        (item: TaskType) => item.id !== task.id
      );
      setItem(updateTasks);
    } else {
      alert("Deletion has been cancelled");
    }
  };

  const { Provider: TaskProvider } = TaskContext;
  const { Provider: ColumnProvider } = ColumnContext;

  return (
    <>
      <Form getNewTask={getNewTask} />
      <ColumnProvider value={{ columns }}>
        <TaskProvider value={{ tasks, moveTask, moveBackTask, removeTask }}>
          <Board />
        </TaskProvider>
      </ColumnProvider>
    </>
  );
};
