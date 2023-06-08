import { observer } from "mobx-react-lite";
import { useContext, useEffect, useMemo, useState } from "react";
import { ControllersContext, StoresContext } from "@/context";
import { Card, CardDataType, RepositoriesList, SearchInput } from "@/components";
import { RepositoryEdge } from "@/gql/graphql";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { QueryPaginationParameters, RoutePath } from "@/models";
import "./home.css";

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
  const [searchString, setSearchString] = useState<string>("");

  const logoutHandle = () => {
    authontroller.logout();
    navigate(RoutePath.login, { replace: true, state: [] });
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

  const loadHandle = (
    key: QueryPaginationParameters.AFTER | QueryPaginationParameters.BEFORE,
    cursor: string
  ) => {
    const payload =
      key === QueryPaginationParameters.AFTER
        ? { after: cursor }
        : { before: cursor };

    searchString &&
      reposController
        .searchReposByString({
          searchString,
          ...payload,
          firstLastKey:
            key === QueryPaginationParameters.AFTER
              ? QueryPaginationParameters.FIRST
              : QueryPaginationParameters.LAST,
        })
        .then((data) => {
          setPageState(data);
        });
  };

  useEffect(() => {
    const urlSearchParam = searchParams.get("search");
    if (!!urlSearchParam?.length && urlSearchParam !== searchString) {
      setSearchString(urlSearchParam);
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
    }
  }, [searchString]);

  useEffect(() => {
    if (!searchString.length && !searchParams.get("search")) {
      reposController.fetchViewerRepos().then((data) => {
        setPageState(data);
      });
    }
  }, [searchString, searchParams]);

  return (
    <div className="homePageWrapper">
      <div>HOME PAGE</div>

      <SearchInput onTypingEnd={setSearchString} value={searchString} />

      <div className="repositoriesListContainer">
        <div>{!searchString?.length ? "Your repos:" : "Searched repos"} </div>
        <RepositoriesList repoList={currentList as RepositoryEdge[]} />
      </div>
      <div className="paginatorContainer">
        <button
          onClick={() =>
            loadHandle(
              QueryPaginationParameters.BEFORE,
              pageState?.pageInfo.startCursor as string
            )
          }
          disabled={!pageState?.pageInfo.hasPreviousPage}
        >
          PrevPage
        </button>
        <button
          onClick={() =>
            loadHandle(
              QueryPaginationParameters.AFTER,
              pageState?.pageInfo.endCursor as string
            )
          }
          disabled={!pageState?.pageInfo.hasNextPage}
        >
          NextPage
        </button>
      </div>

      <button className="logoutBtn" onClick={logoutHandle}>logout</button>
    </div>
  );
});


