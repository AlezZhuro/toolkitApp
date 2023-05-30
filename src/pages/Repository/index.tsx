import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ControllersContext, StoresContext } from "@/context";
import { REPO_NAME_KEY, REPO_OWNER_KEY } from "@/constants";

export const RepositoryPage = observer(() => {
  const [searchParams] = useSearchParams();

  const { reposController } = useContext(ControllersContext);
  const { repositories } = useContext(StoresContext);

  useEffect(() => {
    const owner = searchParams.get(REPO_OWNER_KEY);
    const name = searchParams.get(REPO_NAME_KEY);

    if (owner?.trim().length && name?.trim().length) {
      reposController.searchRepoByName(owner, name);
    }
  }, [searchParams]);

  const repo = repositories.selectedRepo;

  return (
    <div>
      RepositoryPage
      {repo && (
        <div>
          <div>
            <div>Name: {repo.name}</div>
            <div>Start: {repo.stargazerCount}</div>
            <div>
              Last commit :{" "}
              {`${new Date(
                repo?.defaultBranchRef.target?.pushedDate
              ).toLocaleDateString()}`}
            </div>
          </div>
          <div>
            {repo?.owner?.avatarUrl && (
              <div>
                <img src={repo.owner.avatarUrl} alt="avatar" />
              </div>
            )}
            <Link to={repo.owner.url} target="_blank">
              Link to {repo.owner.login} profile
            </Link>
          </div>
          <div>
            <ul>
              {repo.languages?.edges?.map((edge) => (
                <li key={edge.node.name}>{edge.node.name}</li>
              ))}
            </ul>
          </div>
          <div>{repo.description}</div>
        </div>
      )}
    </div>
  );
});
