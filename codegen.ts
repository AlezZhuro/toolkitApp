import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "schema.docs.graphql",
  documents: ["src/**/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: { unmaskFunctionName: "getFragmentData" },
      },

      plugins: [],
      config: {
        documentMode: "string",
      },
    },
  },
};

export default config;
