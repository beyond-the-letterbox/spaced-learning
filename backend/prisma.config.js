"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("prisma/config");
const node_path_1 = __importDefault(require("node:path"));
exports.default = (0, config_1.defineConfig)({
    earlyAccess: true,
    schema: node_path_1.default.join('prisma', 'schema.prisma')
});
