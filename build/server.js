"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); //dotenv는 한번 로드하면 전역임 다른곳에서 import필요 X, process.env에 접근할 수 있음
var users_utils_1 = require("./users/users.utils");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var graphql_upload_1 = require("graphql-upload");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var graphql_1 = require("graphql");
var schema_1 = require("@graphql-tools/schema");
var apollo_server_express_1 = require("apollo-server-express"); //최신문법
//DB URL은 절대! 노출시키면 안됨!
var schema_2 = require("./schema");
var client_1 = __importDefault(require("./client"));
var http = __importStar(require("http"));
var schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: schema_2.resolvers });
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var server, app, httpServer, subscriptionServer, PORT;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                server = new apollo_server_express_1.ApolloServer({
                    schema: schema,
                    context: function (_a) {
                        var req = _a.req;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _b = {};
                                        return [4 /*yield*/, (0, users_utils_1.getUser)(req.headers.token)];
                                    case 1: return [2 /*return*/, (_b.loggedInUser = _c.sent(),
                                            _b.client = client_1.default,
                                            _b)];
                                }
                            });
                        });
                    },
                    plugins: [
                        {
                            serverWillStart: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, {
                                                drainServer: function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            subscriptionServer.close();
                                                            return [2 /*return*/];
                                                        });
                                                    });
                                                },
                                            }];
                                    });
                                });
                            },
                        },
                    ],
                });
                return [4 /*yield*/, server.start()];
            case 1:
                _a.sent();
                app = (0, express_1.default)();
                app.use((0, morgan_1.default)("tiny"));
                app.use((0, graphql_upload_1.graphqlUploadExpress)());
                app.use("/static", express_1.default.static("uploads"));
                server.applyMiddleware(({ app: app }));
                httpServer = http.createServer(app);
                subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
                    schema: schema,
                    execute: graphql_1.execute,
                    subscribe: graphql_1.subscribe,
                    onConnect: function (_a, webSocket, context) {
                        var token = _a.token;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var loggedInUser;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!token) {
                                            throw new Error("You can't listen.");
                                        }
                                        return [4 /*yield*/, (0, users_utils_1.getUser)(token)];
                                    case 1:
                                        loggedInUser = _b.sent();
                                        console.log("Connected!");
                                        return [2 /*return*/, {
                                                loggedInUser: loggedInUser,
                                                client: client_1.default
                                            }];
                                }
                            });
                        });
                    },
                    onDisconnect: function (webSocket, context) {
                        console.log("Disconnected!");
                    },
                }, {
                    server: httpServer,
                    path: server.graphqlPath,
                });
                PORT = process.env.PORT;
                httpServer.listen(PORT, function () { return console.log("Server is running on http://localhost:".concat(PORT).concat(server.graphqlPath)); });
                return [2 /*return*/];
        }
    });
}); };
startServer();
