import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { ControllersContext, StoresContext } from "@/context";
import { Card, CardDataType, SearchInput } from "@/components";
import { RepositoryEdge } from "@/gql/graphql";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();

  const { authontroller, reposController } = useContext(ControllersContext);
  const { repositories } = useContext(StoresContext);

  const viewerRepos = repositories.viewerRepos;
  const searchedRepos = repositories.searchedRepos;

  const [pageState, setPageState] = useState<undefined | PageInfo>(undefined);
  const [searchString, setSearchString] = useState<string | undefined>();

  const logoutHandle = () => {
    authontroller.logout();
    navigate(RoutePath.login, { replace: true });
  };

  const currentList = useMemo(() => {
    if (searchString?.length) {
      return searchedRepos;
    }
    if (!searchString?.length) {
      return viewerRepos;
    }

    return [];
  }, [searchString, searchedRepos, viewerRepos]);

  const loadHandle = (key: "after" | "before", cursor: string) => {
    const payload = key === "after" ? { after: cursor } : { before: cursor };

    searchString &&
      reposController
        .searchReposByString({
          searchString,
          ...payload,
          firstLastKey: key === "after" ? "first" : "last",
        })
        .then((data) => {
          setPageState(data);
        });
  };

  useEffect(() => {
    const urlSearchParam = searchParams.get("search");
    if (!!urlSearchParam?.length && urlSearchParam !== searchString) {
      setSearchString(urlSearchParam);
    } else {
      reposController.fetchViewerRepos().then((data) => {
        setPageState(data);
      });
    }
  }, []);

  useEffect(() => {
    if (!!searchString?.length) {
      setSearchParams(`search=${searchString}`);
      return;
    }

    setSearchParams();
  }, [searchString]);

  useEffect(() => {
    if (!!searchString?.length) {
      reposController.searchReposByString({ searchString }).then((data) => {
        setPageState(data);
      });
    } else {
      reposController.fetchViewerRepos().then((data) => {
        setPageState(data);
      });
    }
  }, [searchString]);

  return (
    <div>
      <div>HOME PAGE</div>

      <SearchInput onTypingEnd={setSearchString} value={searchString} />

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
