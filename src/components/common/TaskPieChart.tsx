import React from "react";
import { Pie, PieConfig } from "@ant-design/charts";
import { useTranslation } from "react-i18next";

const TaskPieChart: React.FC = () => {
  const context = JSON.parse(localStorage.getItem("task"));
  const { t } = useTranslation();

  const taskCounts = {
    todo: context.filter((task) => task.columnId === 1).length,
    inProgress: context.filter((task) => task.columnId === 2).length,
    review: context.filter((task) => task.columnId === 3).length,
    done: context.filter((task) => task.columnId === 4).length,
  };

  const data = [
    { type: t("todo"), value: taskCounts.todo },
    { type: t("in-progress"), value: taskCounts.inProgress },
    { type: t("review"), value: taskCounts.review },
    { type: t("done"), value: taskCounts.done },
  ];

  const config: PieConfig = {
    appendPadding: 10,
    data,
    color: ["#d671ae", "#ffbd0a", "#8fabfb", "#6ddba6"],
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
    theme: {
      styleSheet: {
        fontFamily: "Athiti, sans-serif",
      },
      labels: {
        style: {
          fontFamily: "Athiti, sans-serif",
        },
      },
      title: {
        style: {
          fontFamily: "Athiti, sans-serif",
        },
      },
    },
  };

  return <Pie {...config} />;
};

export default TaskPieChart;
