
import type { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../pages/home/page"));
const ListBusiness = lazy(() => import("../pages/list-business/page"));
const NotFound = lazy(() => import("../pages/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/list-business",
    element: <ListBusiness />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
