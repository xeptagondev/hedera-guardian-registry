// lambda.ts
import { Handler, Context } from "aws-lambda";
import { Server } from "http";
import { proxy } from "aws-serverless-express";
import { bootstrapServer } from "../server";
import { ApiServiceModule } from "./api-service.module";

let cachedServer: Server;

export const handler: Handler = async (event: any, context: Context) => {
  const httpBase = "/api";
  cachedServer = await bootstrapServer(cachedServer, ApiServiceModule, httpBase);
  return proxy(cachedServer, event, context, "PROMISE").promise;
};
