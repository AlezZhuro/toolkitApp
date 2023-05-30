import { observer } from "mobx-react-lite";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ControllersContext, StoresContext } from "@/context";
import { Card, CardDataType, SearchInput } from "@/components";
import { RepositoryEdge } from "@/gql/graphql";
import React from "react";
import { useNavigate, useNavigation, useSearchParams } from "react-router-dom";
import { RoutePath } from "@/models";

type PageInfo = {
  allCount: number;
  pageInfo: {
    __typename?: "PageInfo" | undefined;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
  };
};

export const HomePage = observer(() => {
  const navigate = useNavigate();
  // const rrr = useNavigation()

  const { authontroller, reposController } = useContext(ControllersContext);
  const { authStore, repositories } = useContext(StoresContext);

  const isAuth = authStore.getAuthenticated;
  const viewerRepos = repositories.viewerRepos;
  const searchedRepos = repositories.searchedRepos;

  const [searchString, setSearchString] = useState<string | undefined>();

  const logoutHandle = () => {
    authontroller.logout();
    navigate(RoutePath.login, { replace: true });
  };

  useEffect(() => {
    if (isAuth && !viewerRepos.length) {
      reposController.fetchViewerRepos();
    }
  }, [isAuth, viewerRepos]);

  const currentList = useMemo(() => {
    if (searchString?.length) {
      return searchedRepos;
    }
    if (!searchString?.length) {
      return viewerRepos;
    }

    return [];
  }, [searchString, searchedRepos, viewerRepos]);

  const pageSize = 10;
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [pageState, setPageState] = useState<undefined | PageInfo>(undefined);

  useEffect(() => {
    if (searchString && searchString.length > 0) {
      reposController.searchReposByString({ searchString }).then((data) => {
        setPageState(data);
      });
    }
  }, [searchString]);

  const loadHandle = (key: "after" | "before", cursor: string) => {
    const payload = key === "after" ? { after: cursor } : { before: cursor };

    searchString &&
      reposController
        .searchReposByString({ searchString, ...payload })
        .then((data) => {
          setPageState(data);
        });
  };

  return (
    <div>
      <div>HOME PAGE</div>

      <SearchInput onTypingEnd={setSearchString} />

      <div>{!searchString?.length ? "Your repos:" : "Serched repos"} </div>
      <RepositoriesList repoList={currentList as RepositoryEdge[]} />

      <div>
        <button
          onClick={() =>
            loadHandle("before", pageState?.pageInfo.startCursor as string)
          }
          disabled={!pageState?.pageInfo.hasPreviousPage}
        >
          PrevPage
        </button>
        <button
          onClick={() =>
            loadHandle("after", pageState?.pageInfo.endCursor as string)
          }
          disabled={!pageState?.pageInfo.hasNextPage}
        >
          NextPage
        </button>
      </div>

      <button onClick={logoutHandle}>logout</button>
    </div>
  );
});

const RepositoriesList = React.memo(
  ({ repoList }: { repoList: RepositoryEdge[] }) => {
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
  }
);

// const RepositoryList = () => {

//   return (

//   );
// };
