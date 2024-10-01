import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Root } from "./pages/Root";
import { BoardPage } from "./pages/BoardPage";
import { AnalyticPage } from "./pages/AnalyticPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "analytic",
        element: <AnalyticPage />,
      },
      {
        path: "board",
        element: <BoardPage />,
      },
    ],
  },
]);
