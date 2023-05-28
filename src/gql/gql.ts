/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query ViewerInfo($count: Int!) {\n  viewer {\n    login\n    repositories(first: $count) {\n      edges {\n        node {\n          id\n          name\n          stargazerCount\n          url\n          defaultBranchRef {\n            name\n            target {\n              ... on Commit {\n                id\n                message\n                pushedDate\n              }\n            }\n          }\n          owner {\n            login\n            id\n          }\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}\n  ": types.ViewerInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ViewerInfo($count: Int!) {\n  viewer {\n    login\n    repositories(first: $count) {\n      edges {\n        node {\n          id\n          name\n          stargazerCount\n          url\n          defaultBranchRef {\n            name\n            target {\n              ... on Commit {\n                id\n                message\n                pushedDate\n              }\n            }\n          }\n          owner {\n            login\n            id\n          }\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n    }\n  }\n}\n  "): typeof import('./graphql').ViewerInfoDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
