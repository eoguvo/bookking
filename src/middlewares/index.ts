import { prismaHandleConnection } from "./handlePrismaConnection";
import { requestLogger, setResponseTime } from "./requestLogger";

export default [ prismaHandleConnection, requestLogger, setResponseTime ];