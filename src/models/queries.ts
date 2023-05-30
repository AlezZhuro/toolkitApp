import { graphql } from "@/gql";
import { gql } from "graphql-request";

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

export const SearchReposBySubString = graphql(`
  query SearchReposBySubString($query: String!, $count: Int!, $after: String, $before: String) {
    search(query: $query, type: REPOSITORY, first: $count, after: $after, before: $before) {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      repositoryCount
      edges {
        ...searchItemAttr
      }
    }
  }
`);

export const SearchItemAttr = graphql(`
  fragment searchItemAttr on SearchResultItemEdge {
    cursor
    node {
      ... on Repository {
        ...nodeRepo
        ...repoLastCommitAttr
      }
    }
  }
`);

export const ReporitoryAttr = graphql(`
  fragment repositoryAttr on RepositoryEdge {
    cursor
    node {
      ...nodeRepo
      ...repoLastCommitAttr
    }
  }
`);

export const NodeRepo = graphql(`
  fragment nodeRepo on Repository {
    id
    name
    stargazerCount
    url
    languages(first: 100) {
      ...langInRepo
    }
    owner {
      ...repoOwn
    }
  }
`);

export const RepositoryOwner = graphql(`
  fragment repoOwn on RepositoryOwner {
    id
    login
    url
    avatarUrl
  }
`);

export const RepositoryLastCommit = graphql(`
  fragment repoLastCommitAttr on Repository {
    defaultBranchRef {
      target {
        ...commitAttr
      }
    }
  }
`);

export const CommitFragment = graphql(`
  fragment commitAttr on Commit {
    pushedDate
  }
`);

export const LangInRepo = graphql(`
  fragment langInRepo on LanguageConnection {
    edges {
      node {
        name
      }
    }
  }
`);

export const SearchRepoByName = gql`
  query SearchRepoByName($name: String!, $owner: String!) {
    repository(name: $name, owner: $owner) {
      id
      name
      url
      description
      descriptionHTML
      languages(first: 100) {
        edges {
          node {
            name
          }
        }
      }
      owner {
        avatarUrl
        login
        url
      }
      stargazerCount
      defaultBranchRef {
        target {
          ... on Commit {
            pushedDate
          }
        }
      }
    }
  }
`;
