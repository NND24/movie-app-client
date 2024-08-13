import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/phim/:slug",
    element: <DetailMovie />,
  },
]);
