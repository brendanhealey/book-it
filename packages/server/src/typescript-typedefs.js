"use strict";
exports.__esModule = true;
exports.plugin = void 0;
var utils_1 = require("@graphql-tools/utils");
var graphql_1 = require("graphql");
// https://github.com/dotansimha/graphql-code-generator/issues/3899
var print = function (schema) { return "\n  import { gql } from \"graphql-tag\"\n  export const typeDefs = gql`".concat(schema, "`;\n"); };
var plugin = function (schema) {
    return print((0, graphql_1.stripIgnoredCharacters)((0, utils_1.printSchemaWithDirectives)(schema)));
};
exports.plugin = plugin;
