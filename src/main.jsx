import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

import { Layout, DashboardLayout } from "@components";
import Dashboard from "@pages/Dashboard";
import Settings from "@pages/Dashboard/Settings";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <DashboardLayout />,
          children: [
            {
              path: "/",
              element: <Dashboard />,
            },
            {
              path: "/settings",
              element: <Settings />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: "/Weather-Dashboard/",
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
