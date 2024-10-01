import React from "react";
import { Bar, BarConfig } from "@ant-design/charts";
import { useTranslation } from "react-i18next";

const TaskBarChart: React.FC = () => {
  const context = JSON.parse(localStorage.getItem("task"));

  const { t } = useTranslation();

  const taskCounts = {
    todo: context.filter((task) => task.columnId === 1).length,
    inProgress: context.filter((task) => task.columnId === 2).length,
    review: context.filter((task) => task.columnId === 3).length,
    done: context.filter((task) => task.columnId === 4).length,
  };

  const data = [
    { status: t("todo"), count: taskCounts.todo },
    { status: t("in-progress"), count: taskCounts.inProgress },
    { status: t("review"), count: taskCounts.review },
    { status: t("done"), count: taskCounts.done },
  ];

  const config: BarConfig = {
    data,
    color: ["#d671ae", "#ffbd0a", "#8fabfb", "#6ddba6"],
    xField: "count",
    yField: "status",
    seriesField: "status",
    legend: { position: "top-left" },
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

  return <Bar {...config} />;
};

export default TaskBarChart;
