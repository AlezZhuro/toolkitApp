import { RepositoriesStoreType } from "@/store/Repositories";
import { GraphQLClient } from "graphql-request";
import {
  ViewerRepositoriesQueryQuery,
  ViewerRepositoriesQueryQueryVariables,
  RepositoryAttrFragment,
  SearchItemAttrFragment,
  SearchRepoByNameQuery,
  SearchRepoByNameQueryVariables,
  SearchReposBySubStringQuery,
} from "@/gql/graphql";

import {
  SearchRepoByName,
  SearchReposBySubString,
  ViewerRepositories,
} from "@/models/queries";
import { NUMBER_PER_PAGE } from "@/constants";
import { QueryPaginationParameters, SerchedRepo } from "@/models";

export default class RepositoriesController {
  private readonly _store: RepositoriesStoreType;
  private _api!: GraphQLClient;

  constructor(store: RepositoriesStoreType, apiClient: GraphQLClient) {
    this._store = store;
    this._api = apiClient;
  }

  request() {
    this._api.request;
  }

  async fetchViewerRepos() {
    try {
      const { viewer } = await this._api.request<
        ViewerRepositoriesQueryQuery,
        ViewerRepositoriesQueryQueryVariables
      >(ViewerRepositories.toString(), { count: NUMBER_PER_PAGE });

      const { repositories } = viewer;

      this._store.setViewerRepos(
        repositories.edges as RepositoryAttrFragment[]
      );

      return {
        allCount: repositories.totalCount,
        pageInfo: repositories.pageInfo,
      };
    } catch (error) {
      console.log("fetchViewerRepos error", error);
    } finally {
      console.log("fetchViewerRepos finally");
    }
  }

  async searchReposByString({
    searchString,
    after,
    before,
    firstLastKey = QueryPaginationParameters.FIRST,
  }: {
    searchString: string;
    after?: string | undefined;
    before?: string | undefined;
    firstLastKey?:
      | QueryPaginationParameters.FIRST
      | QueryPaginationParameters.LAST;
  }) {
    try {
      const { search } = await this._api.request<SearchReposBySubStringQuery>(
        SearchReposBySubString.toString(),
        {
          [firstLastKey]: NUMBER_PER_PAGE,
          query: searchString,
          after: after ?? undefined,
          before: before ?? undefined,
        }
      );

      this._store.setSearchedRepos(search?.edges as SearchItemAttrFragment[]);
      return { allCount: search.repositoryCount, pageInfo: search.pageInfo };
    } catch (error) {
      console.log("searchReposByStringError:", error);
    } finally {
      console.log("searchReposByStringFinally");
    }
  }

  async searchRepoByName(ownerName: string, repoName: string) {
    try {
      const { repository } = await this._api.request<
        SearchRepoByNameQuery,
        SearchRepoByNameQueryVariables
      >(SearchRepoByName.toString(), { name: repoName, owner: ownerName });

      this._store.setSelectedRepo(repository as SerchedRepo);
    } catch (error) {
      console.log("searchRepoByName finally:", error);
    } finally {
      console.log("searchRepoByName finally");
    }
  }
}

export type RepositoriesControllerType = RepositoriesController;
