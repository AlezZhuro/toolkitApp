import React from "react";
import {
  CommitFragment,
  NodeRepo,
  ReporitoryAttr,
  RepositoryLastCommit,
} from "@/models/queries";
import { FragmentType, getFragmentData } from "@/gql";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { RoutePath } from "@/models";

type PropsType = {
  card: FragmentType<typeof ReporitoryAttr>;
};

export const Card: React.FC<PropsType> = ({ card }) => {
  const repo = getFragmentData(ReporitoryAttr, card);
  const repoNode = getFragmentData(NodeRepo, repo.node);
  const repoCommitInfo = getFragmentData(RepositoryLastCommit, repo.node);
  const commit = getFragmentData(
    CommitFragment,
    repoCommitInfo?.defaultBranchRef?.target as any
  );

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle}>
        <span className={styles.truncate}>
          Name:
          <Link to={RoutePath.repository}>{repoNode?.name}</Link>
        </span>
        <span>
          Stars: <strong>{Number(repoNode?.stargazerCount)}</strong>
        </span>
      </div>
      <div className={styles.cardSubTitle}>
        <span>
          Last commit:{" "}
          <strong>{new Date(commit.pushedDate).toLocaleDateString()}</strong>
        </span>
        <Link to={repoNode?.url} target="_blank">
          Go to github
        </Link>
      </div>
    </div>
  );
};
