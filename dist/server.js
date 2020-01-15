"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = fastify_1.default();
server.listen(3000, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    else {
        console.log('Server is up and running on port 3000....');
    }
});
//# sourceMappingURL=server.js.map