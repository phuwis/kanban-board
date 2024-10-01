import * as React from "react";
import { ConfigProvider } from "antd";

interface ThemeProviderProps {
  children: any;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = (
  props: ThemeProviderProps
) => {
  const theme = {
    token: {
      fontFamily: "Athiti",
      colorPrimary: "#934E8F",
      colorLink: "rgb(35,62,129)",
      Typography: {
        fontWeightStrong: 600,
      },
      Menu: {
        activeBarBorderWidth: 0,
      },
      Table: {
        headerBg: "#FFFFFF",
        // colorBgContainer: "transparent",
        itemHoverBg: "#eaeff6",
        // colorBgContainer:
        //   "radial-gradient(94.9% 159.36% at 0% -10.74%,rgba(25, 144, 255, 0.05) 0%,rgba(255, 255, 255, 0) 100%),radial-gradient(46.42% 134.49% at 93.97% -26.34%,#ebddea 0%,rgba(237, 225, 236, 0.721641) 30.17%,rgba(239, 228, 238, 0.495834) 63.96%,rgba(255, 255, 255, 0) 100%)",
      },
      Card: {
        // colorBgContainer: "transparent",
      },
      Tabs: {
        itemSelectedColor: "#000000 !important",
      },
      Segmented: {
        /* here is your component tokens */
        itemSelectedBg: "#f56a008f !important",
        itemSelectedColor: "#000000 !important",
        itemHoverBg: "#f56a0024 !important",
      },
      Form: {
        marginLG: "8px",
      },
    },
  };

  return <ConfigProvider theme={theme}>{props.children}</ConfigProvider>;
};
