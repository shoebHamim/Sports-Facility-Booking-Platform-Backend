"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    environment: process.env.ENV,
    salt_round: process.env.SALT_ROUND,
    facility_opening_time: process.env.FACILITY_OPENING_TIME,
    facility_closing_time: process.env.FACILITY_CLOSING_TIME,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
