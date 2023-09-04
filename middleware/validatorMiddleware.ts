import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import {
  ErrorMessageOptions,
  TransformErrorParams,
  generateErrorMessage,
} from "zod-error";

import ApiError from "../utils/ApiError";

interface ValidatorMiddlewareOptions {
  validator: ZodSchema;
  location: "body" | "query" | "params";
  options?: ErrorMessageOptions;
}
type ValidatorMiddleware = (opts: ValidatorMiddlewareOptions) => RequestHandler;

export const transformError = ({ messageComponent }: TransformErrorParams) => {
  const pos = messageComponent.split("Message: ");
  return pos[1];
};

const validatorMiddleware: ValidatorMiddleware = ({
  validator,
  location,
  options,
}) => {
  // Actual middleware callback that will be called by express
  return (req, _, next) => {
    // Calling the validator
    const errorResult = validator.safeParse(req[location]);
    //  Calling next if there are no reported errors.
    if (errorResult.success) return next();
    // Destructuring the error
    const { error: err } = errorResult;
    // Setting default options if options is not specified
    let defaultOpts: ErrorMessageOptions = {};
    if (!options) {
      defaultOpts.transform = transformError;
      defaultOpts.maxErrors = 1;
    }
    // Generating error message from the error returned
    const message = generateErrorMessage(err.issues, options || defaultOpts);
    // Generating a error to be sent to the global error handler
    const error = new ApiError(400, message);
    // Calling next with error
    return next(error);
  };
};

export default validatorMiddleware;
