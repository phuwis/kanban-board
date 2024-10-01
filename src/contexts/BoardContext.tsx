import React from "react";

interface TaskContextType {
  tasks: {
    id: number;
    columnId: number;
    title: string;
    user: string;
  }[];
  moveTask: (taskId: number, columnId: number) => void;
  moveBackTask: (taskId: number, columnId: number) => void;
  removeTask: (taskId: number) => void;
}

interface ColumnContextType {
  columns: {
    id: number;
    title: string;
    className: string;
    limit: number;
  }[];
}

const TaskContext = React.createContext<TaskContextType | undefined>(undefined);
const ColumnContext = React.createContext<ColumnContextType | undefined>(
  undefined
);

export { TaskContext, ColumnContext };
