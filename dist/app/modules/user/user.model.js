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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
    phone: { type: String, required: true },
    address: { type: String, required: true },
}, {
    versionKey: false
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (this.isModified('password')) {
            const salt = yield bcrypt_1.default.genSalt(Number(config_1.default.salt_round));
            const hash = yield bcrypt_1.default.hash(user.password, salt);
            user.password = hash;
        }
        next();
    });
});
userSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        doc.password = '';
        next();
    });
});
userSchema.statics.hasPasswordMatched = function (plainPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    });
};
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
