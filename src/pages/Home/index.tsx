import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { ControllersContext, StoresContext } from "@/context";
import {  Card, CardDataType, SearchInput } from "@/components";
import { RepositoryEdge } from "@/gql/graphql";

export const HomePage = observer(() => {
  const { authontroller, reposController } = useContext(ControllersContext);
  const { authStore, repositories } = useContext(StoresContext);

  const isAuth = authStore.getAuthenticated;
  const viewerRepos = repositories.viewerRepos;
  const searchedRepos = repositories.searchedRepos;

  const [searchString, setSearchString] = useState<string | undefined>();

  const logoutHandle = () => {
    authontroller.logout();
  };

  useEffect(() => {
    if (isAuth && !viewerRepos.length) {
      reposController.fetchViewerRepos();
    }
  }, [isAuth, viewerRepos]);

  useEffect(() => {
    if (searchString && searchString.length > 0) {
      reposController.searchReposByString(searchString);
    }
  }, [searchString]);

  const currentList = useMemo(() => {
    if (searchString?.length) {
      return searchedRepos;
    }
    if (!searchString?.length) {
      return viewerRepos;
    }

    return [];
  }, [searchString, searchedRepos, viewerRepos]);

  return (
    <div>
      <div>HOME PAGE</div>

      <SearchInput onTypingEnd={setSearchString} />

      <div>{!searchString?.length ? "Your repos:" : "Serched repos"} </div>
      <RepositoriesList repoList={currentList as RepositoryEdge[]} />

      <button onClick={logoutHandle}>logout</button>
    </div>
  );
});

const RepositoriesList = ({ repoList }: { repoList: RepositoryEdge[] }) => {
  return (
    <div>
      <ul>
        {repoList.map((r) => (
          <li key={r.cursor}>
            <Card data={r.node as unknown as CardDataType} />
          </li>
        ))}
      </ul>
    </div>
  );
};
