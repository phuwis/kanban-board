import { RouterProvider } from "react-router";
import { router } from "./routers";
import { ThemeProvider } from "components/themes";
import "./utils/i18n";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
