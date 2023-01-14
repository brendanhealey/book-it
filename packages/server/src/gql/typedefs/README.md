# This directory is no longer needed

The typedefs are now automatically generated from the schema.graphql file by the
typescript-typedefs plugin (currently src/typescript-typedefs.ts). See also the
single line entry in codegen.yml.

If you make a change to typescript-typedefs.ts then compile it with tsc so codegen
can pick up the js file.

The typeDefs export is available in src/gql/generated/resolverTypes.ts.
