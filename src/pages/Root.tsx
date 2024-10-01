import { Outlet } from "react-router-dom";
import { AppLayout } from "src/components/layout/AppLayout";

export const Root = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
