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
    "\n  query ViewerRepositoriesQuery($count: Int!) {\n    viewer {\n      login\n      name\n      repositories(first: $count) {\n        edges {\n          ...repositoryAttr\n          cursor\n        }\n        totalCount\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n      }\n    }\n  }\n": types.ViewerRepositoriesQueryDocument,
    "\n  query SearchReposBySubString($query: String!, $first: Int,$last: Int, $after: String, $before: String) {\n    search(query: $query, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      repositoryCount\n      edges {\n        ...searchItemAttr\n      }\n    }\n  }\n": types.SearchReposBySubStringDocument,
    "\n  fragment searchItemAttr on SearchResultItemEdge {\n    cursor\n    node {\n      ... on Repository {\n        ...nodeRepo\n        ...repoLastCommitAttr\n      }\n    }\n  }\n": types.SearchItemAttrFragmentDoc,
    "\n  fragment repositoryAttr on RepositoryEdge {\n    cursor\n    node {\n      ...nodeRepo\n      ...repoLastCommitAttr\n    }\n  }\n": types.RepositoryAttrFragmentDoc,
    "\n  fragment nodeRepo on Repository {\n    id\n    name\n    stargazerCount\n    url\n    languages(first: 100) {\n      ...langInRepo\n    }\n    owner {\n      ...repoOwn\n    }\n  }\n": types.NodeRepoFragmentDoc,
    "\n  fragment repoOwn on RepositoryOwner {\n    id\n    login\n    url\n    avatarUrl\n  }\n": types.RepoOwnFragmentDoc,
    "\n  fragment repoLastCommitAttr on Repository {\n    defaultBranchRef {\n      target {\n        ...commitAttr\n      }\n    }\n  }\n": types.RepoLastCommitAttrFragmentDoc,
    "\n  fragment commitAttr on Commit {\n    pushedDate\n  }\n": types.CommitAttrFragmentDoc,
    "\n  fragment langInRepo on LanguageConnection {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n": types.LangInRepoFragmentDoc,
    "\n  query SearchRepoByName($name: String!, $owner: String!) {\n    repository(name: $name, owner: $owner) {\n      id\n      name\n      url\n      description\n      descriptionHTML\n      languages(first: 100) {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n      owner {\n        avatarUrl\n        login\n        url\n      }\n      stargazerCount\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            pushedDate\n          }\n        }\n      }\n    }\n  }\n": types.SearchRepoByNameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ViewerRepositoriesQuery($count: Int!) {\n    viewer {\n      login\n      name\n      repositories(first: $count) {\n        edges {\n          ...repositoryAttr\n          cursor\n        }\n        totalCount\n        pageInfo {\n          endCursor\n          hasNextPage\n          hasPreviousPage\n          startCursor\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').ViewerRepositoriesQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchReposBySubString($query: String!, $first: Int,$last: Int, $after: String, $before: String) {\n    search(query: $query, type: REPOSITORY, first: $first, last: $last, after: $after, before: $before) {\n      pageInfo {\n        endCursor\n        hasNextPage\n        hasPreviousPage\n        startCursor\n      }\n      repositoryCount\n      edges {\n        ...searchItemAttr\n      }\n    }\n  }\n"): typeof import('./graphql').SearchReposBySubStringDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment searchItemAttr on SearchResultItemEdge {\n    cursor\n    node {\n      ... on Repository {\n        ...nodeRepo\n        ...repoLastCommitAttr\n      }\n    }\n  }\n"): typeof import('./graphql').SearchItemAttrFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment repositoryAttr on RepositoryEdge {\n    cursor\n    node {\n      ...nodeRepo\n      ...repoLastCommitAttr\n    }\n  }\n"): typeof import('./graphql').RepositoryAttrFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment nodeRepo on Repository {\n    id\n    name\n    stargazerCount\n    url\n    languages(first: 100) {\n      ...langInRepo\n    }\n    owner {\n      ...repoOwn\n    }\n  }\n"): typeof import('./graphql').NodeRepoFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment repoOwn on RepositoryOwner {\n    id\n    login\n    url\n    avatarUrl\n  }\n"): typeof import('./graphql').RepoOwnFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment repoLastCommitAttr on Repository {\n    defaultBranchRef {\n      target {\n        ...commitAttr\n      }\n    }\n  }\n"): typeof import('./graphql').RepoLastCommitAttrFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment commitAttr on Commit {\n    pushedDate\n  }\n"): typeof import('./graphql').CommitAttrFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment langInRepo on LanguageConnection {\n    edges {\n      node {\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').LangInRepoFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchRepoByName($name: String!, $owner: String!) {\n    repository(name: $name, owner: $owner) {\n      id\n      name\n      url\n      description\n      descriptionHTML\n      languages(first: 100) {\n        edges {\n          node {\n            name\n          }\n        }\n      }\n      owner {\n        avatarUrl\n        login\n        url\n      }\n      stargazerCount\n      defaultBranchRef {\n        target {\n          ... on Commit {\n            pushedDate\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').SearchRepoByNameDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
