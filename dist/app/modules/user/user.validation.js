"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name is required" }).min(2, 'Name is length must be at least 2 characters'),
    email: zod_1.z.string({ required_error: "email is required" }).email('Invalid email format'),
    password: zod_1.z.string({ required_error: "password is required" }).min(6, 'Password length must be at least 6 character long'),
    phone: zod_1.z.string({ required_error: "phone is required" }).min(11, 'Phone number must be minimum of 11 characters'),
    role: zod_1.z.enum(['admin', 'user'], { required_error: "role is required", invalid_type_error: "Role must be admin or user" }),
    address: zod_1.z.string({ required_error: "address is required" }).min(8, 'Address length must be minimum of 8 characters'),
});
const loginUser = zod_1.z.object({
    email: zod_1.z.string({ required_error: "email is required" }).email('Invalid email format'),
    password: zod_1.z.string({ required_error: "password is required" }).min(6, 'Password length must be at least 6 character long')
});
exports.userValidationSchema = {
    createUser,
    loginUser
};
