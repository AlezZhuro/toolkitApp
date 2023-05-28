import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.docs.graphql",
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: ["typescript", "typescript-graphql-request"],
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
