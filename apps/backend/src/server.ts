import http from "http";
import {app} from "./app";
import {db, initSchema, seedSampleData} from "@db";

const PORT = process.env.PORT || 3000;
let server: http.Server;
let shuttingDown = false;

// ----------< Start >----------
(async () => {
    try {
        await initSchema();
        await seedSampleData();
        server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1);
    }
})();

// ----------< Shutdown >----------
const shutdown = async (signal: string) => {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`\nReceived ${signal}. Shutting down...`);

    try {
        if (server?.listening) {
            await new Promise<void>((resolve, reject) =>
                server.close((err) => (err ? reject(err) : resolve()))
            );
        }

        await db.close();

        console.log("Shutdown complete.");
        process.exit(0);
    } catch (err) {
        console.error("Shutdown failed:", err);
        process.exit(1);
    }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));