"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = require("../../error/AppError");
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = __importDefault(require("../../config"));
const signUpUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(userData);
    const _a = result.toObject(), { password } = _a, withoutPassword = __rest(_a, ["password"]);
    return withoutPassword;
});
const loginUserFromDB = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password: givenPassword } = loginData;
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        return user;
    }
    const hasPasswordMatched = yield user_model_1.default.hasPasswordMatched(givenPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!hasPasswordMatched) {
        throw new AppError_1.AppError(http_status_1.default.FORBIDDEN, "Wrong password");
    }
    // create token and send to the client
    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, {
        expiresIn: "7d",
    });
    const _b = user.toObject(), { password } = _b, withoutPassword = __rest(_b, ["password"]);
    return { withoutPassword, accessToken };
});
exports.authServices = {
    signUpUserIntoDB,
    loginUserFromDB
};
