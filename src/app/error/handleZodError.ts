import { ZodError } from "zod";
import { TErrorMessages } from "../interfaces/error.interface";

const handleZodError = (err: ZodError) => {
  const statusCode = 400;
  const errorMessages:TErrorMessages = err.issues.map(singleIssue => {
    return{
      path: singleIssue.path,
      message: singleIssue.message,
    } 
  });
  return {
    statusCode,
    message: "Validation Error",
    errorMessages
  };
};

export default handleZodError;