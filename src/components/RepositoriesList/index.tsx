import React from "react";
import { RepositoryEdge } from "src/gql/graphql";
import { Card, CardDataType } from "..";
import './RepositoriesList.css'

export const RepositoriesList = React.memo(
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
