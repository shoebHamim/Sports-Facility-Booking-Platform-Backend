"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const statusCode = 400;
    const errorMessages = err.issues.map(singleIssue => {
        return {
            path: singleIssue.path,
            message: singleIssue.message,
        };
    });
    return {
        statusCode,
        message: "Validation Error",
        errorMessages
    };
};
exports.default = handleZodError;
