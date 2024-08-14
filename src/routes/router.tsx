import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";
import ListMovie from "../pages/ListMovie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/phim/:slug",
    element: <DetailMovie />,
  },
  {
    path: "/danh-sach/:cat",
    element: <ListMovie />,
  },
  {
    path: "/the-loai/:genre",
    element: <ListMovie />,
  },
  {
    path: "/quoc-gia/:nation",
    element: <ListMovie />,
  },
]);
