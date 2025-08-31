import {createBrowserRouter} from "react-router";
import HomePage from "./module/home/HomePage.jsx";
import Root from "./Root.jsx";
import AdminDashboardPage from "./module/admin/AdminDashboardPage.jsx"
import CreateUserPage from "./module/user/CreateUserPage.jsx"
import DashboardPage from "./module/audio/DashboardPage.jsx"
import AudioPlayer from "./module/audio/AudioPlayer.jsx"
import UploadPage from "./module/audio/UploadPage.jsx"
import UserPage from "./module/user/UserPage.jsx";

const router = createBrowserRouter([
  {
    Component: Root,
    children: [
      { path: "/", loader: HomePage.loader, Component: HomePage },
      {
        path: "/admin",
        loader: AdminDashboardPage.loader,
        Component: AdminDashboardPage,
      },
      { path: "/user/:id", Component: UserPage, loader: UserPage.loader },
      {
        path: "/create-user",
        Component: CreateUserPage,
      },
      {
        path: "/dashboard",
        loader: DashboardPage.loader,
        Component: DashboardPage,
      },
      {
        path: "/audio/:id",
        loader: AudioPlayer.loader,
        Component: AudioPlayer,
      },
      {
        path: "/upload-audio",
        Component: UploadPage,
      },
    ],
  },
]);

export default router;
