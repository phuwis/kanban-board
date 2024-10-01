import { Link } from "react-router-dom";
import * as Icon from "@ant-design/icons";

export const Menus = (t: any) => {
  const menus = [
    {
      label: <Link to="/analytic">{t("analytic")}</Link>,
      key: "analytic",
      icon: <Icon.AreaChartOutlined />,
    },
    {
      label: <Link to="/board">{t("board")}</Link>,
      key: "board",
      icon: <Icon.ProjectOutlined />,
    },
  ];
  return menus;
};
