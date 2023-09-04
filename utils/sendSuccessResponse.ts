import { Request, Response } from "express";
import env from "./validateEnv";

type SendResponseProps<TStatusCode extends number> = {
  statusCode: TStatusCode;
  type: TStatusCode extends 201
    ? "CREATED"
    : TStatusCode extends 204
    ? "DELETED"
    : "OK" | "UPDATED";
  request: Request;
  response: Response;
} & (TStatusCode extends 204 ? {} : SendAdditionalResponseProps);

interface SendAdditionalResponseProps {
  data: unknown;
}
const sendResponse = <T extends number>(props: SendResponseProps<T>) => {
  props.response.status(props.statusCode).json({
    ip: props.request.ip,
    mode: env.isDev ? "development" : "production",
    type: props.type,
    data: props.data,
  });
};
export default sendResponse;
