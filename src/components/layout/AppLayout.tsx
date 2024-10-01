import { Card, Layout } from "antd";
import Sidebar from "./Sidebar";
import { Headerbar } from "./Headerbar";

export const AppLayout = (props: any) => {
  return (
    <Layout style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      <Sidebar />
      <Layout style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <Headerbar />
        <Card
          style={{
            margin: "20px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
          bodyStyle={{
            overflowY: "auto",
            maxHeight: "calc(100vh - 120px)",
            padding: "16px",
          }}
        >
          {props.children}
        </Card>
      </Layout>
    </Layout>
  );
};
