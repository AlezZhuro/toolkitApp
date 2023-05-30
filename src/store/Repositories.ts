import { makeAutoObservable } from "mobx";
import {
  Repository,
  RepositoryAttrFragment,
  SearchItemAttrFragment,
  SearchResultItemEdge,
} from "@/gql/graphql";
import { RootStore } from "./Root";
import { SerchedRepo } from "@/models";

interface IRepositoriesStore {
  viewerRepos: RepositoryAttrFragment[];
  searchedRepos: SearchItemAttrFragment[];
  selectedRepo: SerchedRepo | undefined
}

export default class RepositoriesStore {
  protected readonly state: IRepositoriesStore = {
    viewerRepos: [],
    searchedRepos: [],
    selectedRepo: undefined,
  };

  rootStore: RootStore;
  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this);
  }

  get viewerRepos() {
    return this.state.viewerRepos;
  }
  get searchedRepos() {
    return this.state.searchedRepos;
  }
  get selectedRepo() {
    return this.state.selectedRepo;
  }

  setViewerRepos(repos: RepositoryAttrFragment[]) {
    this.state.viewerRepos = repos;
  }

  setSearchedRepos(repos: SearchItemAttrFragment[]) {
    this.state.searchedRepos = repos;
  }

  setSelectedRepo(repo: SerchedRepo) {
    this.state.selectedRepo = repo;
  }
}

export type RepositoriesStoreType = RepositoriesStore;
