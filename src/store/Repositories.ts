import { makeAutoObservable } from "mobx";
import { NodeRepoFragment, RepoLastCommitAttrFragment, Repository, RepositoryAttrFragment } from "@/gql/graphql";
import { RootStore } from "./Root";
import { ViewerReposType } from "@/controllers";

interface IRepositoriesStore {
  viewerRepos: RepositoryAttrFragment[];
  searchedRepos: Repository[];
  selectedRepo: any;
}

export default class RepositoriesStore {
  protected readonly state: IRepositoriesStore = {
    viewerRepos: [],
    searchedRepos: [],
    selectedRepo: {},
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

  setSearchedRepos(repos: Repository[]) {
    this.state.searchedRepos = repos;
  }

  setSelectedRepo(repo: any) {
    this.state.selectedRepo = repo;
  }
}

export type RepositoriesStoreType = RepositoriesStore;
