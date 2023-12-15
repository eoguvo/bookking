import { DefaultContext, DefaultState, Next, ParameterizedContext } from "koa";

export type contextType<DataType> = ParameterizedContext<DefaultState, DefaultContext, DataType>;

export type nextType = Next;

export type TypeRoutes<T> = { method: "get"|"post"|"patch"|"delete", path: string, handler: (ctx: contextType<T>, next?: nextType) => void }[];
