import {app} from "./app";
import {initSchema} from "@db/db.init-schema";
import {seedSampleData} from "@db/db.sample-data";


// ----------< Constants >----------
const PORT = process.env.PORT || 3000;
//const ROOT_DIR = process.cwd();


// ----------< Init >----------
(async () => {
    try {
        await initSchema();
        await seedSampleData();
        console.log("Database setup completed.");

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error("DB init failed:", err);
        process.exit(1);
    }
})();