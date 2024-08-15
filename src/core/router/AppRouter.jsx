import { Route, Routes } from "react-router-dom";
import Movies from "../../components/Movies";
import AppLayout from "../../layouts/AppLayout";
import StarredMovies from "../../components/StarredMovies";
import WatchLater from "../../components/WatchLater";

const appRoutes = [
  {
    path: "/",
    element: <Movies />,
  },
  {
    path: "/starred",
    element: <StarredMovies />,
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
