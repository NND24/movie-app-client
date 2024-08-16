import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import DetailMovie from "../pages/DetailMovie";
import ListMovie from "../pages/ListMovie";
import WatchMovie from "../pages/WatchMovie";
import FollowedMovie from "../pages/FollowedMovie";

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
    path: "/phim/:slug/:episode",
    element: <WatchMovie />,
  },
  {
    path: "/danh-sach/:category",
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
  {
    path: "/tim-kiem/:search",
    element: <ListMovie />,
  },
  {
    path: "/theo-doi",
    element: <FollowedMovie />,
  },
]);
