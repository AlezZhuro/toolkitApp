import { RepositoriesStoreType } from "@/store/Repositories";
import { GraphQLClient } from "graphql-request";
import {
  ViewerRepositoriesQueryQuery,
  ViewerRepositoriesQueryQueryVariables,
  RepositoryAttrFragment,
} from "@/gql/graphql";

import { ViewerRepositories } from "@/models/queries";
import { NUMBER_PER_PAGE } from "@/constants";

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
    } catch (error) {
      console.log("fetchViewerRepos error", error);
    } finally {
      console.log("fetchViewerRepos finally");
    }
  }
}

export type RepositoriesControllerType = RepositoriesController;
