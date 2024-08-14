import { Route, Routes } from "react-router-dom";
import Movies from "../../components/Movies";
import WatchLater from "../../components/WatchLater";
import Starred from "../../components/Starred";
import AppLayout from "../../layouts/AppLayout";

const appRoutes = [
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/starred",
    element: <Starred />,
  },
  {
    path: "/watch-later",
    element: <WatchLater />,
  },
];

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {appRoutes.map((route, index) => (
          <Route key={`${route.path}${index}`} {...route} />
        ))}
        <Route
          path="*"
          element={<h1 className="not-found">Page Not Found</h1>}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
