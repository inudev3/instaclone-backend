"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var merge_1 = require("@graphql-tools/merge");
var load_files_1 = require("@graphql-tools/load-files");
//graphql-tools는 원하는 항목(mutation,query,typeDefs)를 묶어서 다룰 수 있게 해줌
//loadfileSync로 패턴을 보내서 원하는 파일을 불러올 수 있음 loadFileSynce는 default export만 가져옴
// **는 폴더, *는 파
var loadedTypes = (0, load_files_1.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.*"));
var loadedResolvers = (0, load_files_1.loadFilesSync)("".concat(__dirname, "/**/*.resolvers.*"));
exports.typeDefs = (0, merge_1.mergeTypeDefs)(loadedTypes);
exports.resolvers = (0, merge_1.mergeResolvers)(loadedResolvers);
