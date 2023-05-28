import { AuthStoreType, RepositoriesStoreType, AuthStore, RepositoriesStore } from ".";

export class RootStore {
    authStore: AuthStoreType;
    repositories: RepositoriesStoreType;
    constructor() {
        this.authStore = new AuthStore(this)
        this.repositories = new RepositoriesStore(this)
    }
  }