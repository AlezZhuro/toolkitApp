import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { ControllersContext, StoresContext } from "@/context";
import { Link } from "react-router-dom";
import { RoutePath } from "@/models";

export const HomePage = observer(() => {
  const { authontroller, reposController } = useContext(ControllersContext);
  const { authStore, repositories } = useContext(StoresContext);

  const isAuth = authStore.getAuthenticated;
  const viewerRepos = repositories.viewerRepos;
  const logoutHandle = () => {
    authontroller.logout();
  };

  useEffect(() => {
    if (isAuth && !viewerRepos.length) {
      reposController.fetchViewerRepos();
    }
  }, [isAuth, viewerRepos]);

  return (
    <div>
      <div>HOME PAGE</div>

      <Link to={RoutePath.repository}>next page</Link>

      
      <div>
        Your repos:
        <div>
        {viewerRepos.map((r) => (
        <span>{r.name}</span>
      ))}
        </div>
      </div>

      <button onClick={logoutHandle}>logout</button>
    </div>
  );
});
