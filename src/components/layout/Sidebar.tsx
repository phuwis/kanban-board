import React from "react";
import { Layout, Menu, Image, Typography, Row, Col, Button, Flex } from "antd";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/kanban.png";
// import sidebar from "../assets/images/abstract_sidebar.png";
import { Menus } from "./Menus";
import {
  LeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState<any[]>([]);
  const [isMobile, setIsMobile] = React.useState(false);
  const { t } = useTranslation();

  const handleMenuClick = () => {
    if (isMobile) {
      setCollapsed(true);
    }
  };

  const menusWithOnClick = Menus(t).map((menu: any) => ({
    ...menu,
    onClick: handleMenuClick,
  }));

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    const currentPathname = location.pathname;
    const resultPath = Menus(t)
      .filter((menu: any) => currentPathname.includes(menu.key))
      .map((item: any) => item.key);

    setActiveKey(resultPath);
  }, [location.pathname, setActiveKey]);

  React.useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (
    <>
      <Sider
        width={isMobile && collapsed ? 0 : 200}
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
        breakpoint="lg"
        collapsedWidth={isMobile ? 0 : 80}
        onBreakpoint={(broken) => {
          setIsMobile(broken);
        }}
        style={{
          position: isMobile ? "fixed" : "relative",
          zIndex: 10,
          height: "100vh",
          transition: "width 0.2s",
        }}
      >
        <Flex vertical justify="space-between" style={{ minHeight: "100vh" }}>
          <div>
            <Image
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundImage: `url(${logo})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.1,
              }}
            />
            <Row
              justify="center"
              align="middle"
              style={{
                marginTop: "10px",
              }}
            >
              <Col>
                <Link to={""}>
                  <Image
                    preview={false}
                    src={logo}
                    width={collapsed ? 40 : 70}
                  />
                </Link>
              </Col>
            </Row>
            {!collapsed && (
              <Row
                justify="center"
                align="middle"
                gutter={[12, 12]}
                style={{
                  marginTop: "10px",
                  marginBottom: "-10px",
                }}
              >
                <Col>
                  <Typography style={{ color: "#19142A", fontSize: "20px" }}>
                    KANBAN Board
                  </Typography>
                </Col>
              </Row>
            )}
            <div style={{ marginTop: collapsed ? "40px" : "0px" }}>
              <Menu
                theme="light"
                mode="inline"
                selectedKeys={activeKey}
                defaultOpenKeys={["/"]}
                style={{
                  backgroundColor: "#F7F7F7",
                  marginTop: collapsed ? "0px" : "60px",
                  overflow: "auto",
                }}
              >
                {menusWithOnClick.map((menu) =>
                  menu.divider ? (
                    <Menu.Divider key={menu.key} />
                  ) : menu.children ? (
                    <SubMenu key={menu.key} icon={menu.icon} title={menu.label}>
                      {menu.children.map((subMenu: any) => (
                        <Menu.Item key={subMenu.key}>{subMenu.label}</Menu.Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Menu.Item
                      key={menu.key}
                      icon={menu.icon}
                      disabled={menu.disable}
                    >
                      {menu.label}
                    </Menu.Item>
                  )
                )}
              </Menu>
            </div>
          </div>

          <div>
            <Button
              className="custom-sider-trigger"
              style={{ width: "100%", height: "40px" }}
              onClick={toggle}
            >
              {collapsed ? (
                <RightOutlined style={{ fontSize: "18px" }} />
              ) : (
                <LeftOutlined style={{ fontSize: "18px" }} />
              )}
            </Button>
          </div>
        </Flex>
      </Sider>
      {isMobile && collapsed === false && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(25, 20, 42, 0.8)", // RGBA color for transparency
            zIndex: 9,
          }}
          onClick={() => setCollapsed(true)}
        />
      )}
      {isMobile === true && (
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            zIndex: 1,
            margin: "20px 10px",
            position: "fixed",
            fontSize: "24px",
            top: 20,
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
