import {mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge";
import {loadFilesSync} from "@graphql-tools/load-files";
import {makeExecutableSchema} from "@graphql-tools/schema";


//graphql-tools는 원하는 항목(mutation,query,typeDefs)를 묶어서 다룰 수 있게 해줌
//loadfileSync로 패턴을 보내서 원하는 파일을 불러올 수 있음 loadFileSynce는 default export만 가져옴
// **는 폴더, *는 파

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);

const loadedResolvers = loadFilesSync(
    `${__dirname}/**/*.resolvers.ts`
);
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
