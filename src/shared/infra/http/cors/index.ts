import server from "@config/server";
import cors from "cors";

const corsOptions = {
    preflightMaxAge: server.preflightMaxAge,
    origin: server.origin,
    allowHeaders: server.allowHeaders,
    exposedHeaders: server.exposedHeaders,
    credentials: server.credentials
};

const corsConfig = cors(corsOptions);

export { corsConfig };