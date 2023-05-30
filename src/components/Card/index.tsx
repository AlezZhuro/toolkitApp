import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { RoutePath } from "@/models";
import { useMemo } from "react";

export type CardDataType = {
  id: string;
  name: string;
  stargazerCount: number;
  url: string;
  defaultBranchRef: {
    target: {
      pushedDate: Date;
    };
  };

  owner: {
    avatarUrl: string;
    id: string;
    login: string;
    url: string;
  };
};

type PropsType = {
  data: CardDataType;
};

export const Card: React.FC<PropsType> = ({ data }) => {
  const repoSearchParams = useMemo(() => {
    return `${RoutePath.repository}?owner=${data.owner.login}&name=${data.name}`;
  }, [data]);

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle}>
        <span className={styles.truncate}>
          Name:
          <Link to={repoSearchParams}>{data?.name}</Link>
        </span>
        <span>
          Stars: <strong>{Number(data?.stargazerCount)}</strong>
        </span>
      </div>
      <div className={styles.cardSubTitle}>
        <span>
          Last commit:
          <strong>
            {new Date(
              data.defaultBranchRef.target.pushedDate
            ).toLocaleDateString()}
          </strong>
        </span>
        <Link to={data?.url} target="_blank">
          Go to github
        </Link>
      </div>
    </div>
  );
};
