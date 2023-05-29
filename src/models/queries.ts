import { graphql } from "@/gql";

export const ViewerRepositories = graphql(`
  query ViewerRepositoriesQuery($count: Int!) {
    viewer {
      login
      name
      repositories(first: $count) {
        edges {
          ...repositoryAttr
          cursor
        }
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`);

export const ReporitoryAttr = graphql(`
  fragment repositoryAttr on RepositoryEdge {
    __typename
    node {
      ...nodeRepo
      ...repoLastCommitAttr
    }
  }
`);

export const NodeRepo = graphql(`
  fragment nodeRepo on Repository {
    __typename
    id
    name
    stargazerCount
    url
    owner {
      ...repoOwn
    }
  }
`);

export const RepositoryOwner = graphql(`
  fragment repoOwn on RepositoryOwner {
    __typename
    id
    login
    url
    avatarUrl
  }
`);

export const RepositoryLastCommit = graphql(`
  fragment repoLastCommitAttr on Repository {
    __typename
    defaultBranchRef {
      target {
        ...commitAttr
      }
    }
  }
`);

export const CommitFragment = graphql(`
  fragment commitAttr on Commit {
    __typename
    message
    pushedDate
  }
`);
