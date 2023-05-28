import { gql } from "graphql-request";

export const ViewerInfo = gql`
  query ViewerInfo($count: Int!) {
    viewer {
      login
      repositories(first: $count) {
        edges {
          node {
            id
            name
            stargazerCount
            url
            defaultBranchRef {
              name
              target {
                ... on Commit {
                  id
                  message
                  pushedDate
                }
              }
            }
            owner {
              login
              id
            }
          }
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
`;
