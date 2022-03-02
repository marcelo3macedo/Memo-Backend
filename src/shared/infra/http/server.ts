import { app } from "./app";
import logger from "@config/logger";
import server from "@config/server";

const port = server.port;
app.listen(port, () => logger.info(`Server running on port ${port}`));