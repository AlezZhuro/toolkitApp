import { RepositoriesStoreType } from "@/store/Repositories";
import { GraphQLClient } from "graphql-request";
import {
  Repository,
  RepositoryEdge,
  ViewerInfoQuery,
  ViewerInfoQueryVariables,
} from "@/gql/graphql";
import { ViewerInfo } from "@/models/queries";
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
        ViewerInfoQuery,
        ViewerInfoQueryVariables
      >(ViewerInfo, { count: NUMBER_PER_PAGE });

      const { login, repositories } = viewer;

      const repos = this.mappingRepositoryEdge(
        repositories.edges as RepositoryEdge[]
      );
      this._store.setViewerRepos(repos);
    } catch (error) {
      console.log("fetchViewerRepos error", error);
    } finally {
      console.log("fetchViewerRepos finally");
    }
  }

  mappingRepositoryEdge(array: RepositoryEdge[]) {
    return array.reduce((acc: Repository[], edge): Repository[] => {
      if (edge.node) {
        acc.push(edge.node);
      }
      return acc;
    }, []);
  }
}

export type RepositoriesControllerType = RepositoriesController;
