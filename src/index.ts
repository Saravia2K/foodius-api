import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static(path.join(__dirname, "uploads")));

//
// Loading routes
//
console.log("Loading routes...");
const routesPath = path.join(__dirname, "routes");
Promise.all(
  fs.readdirSync(routesPath).map(async (filename) => {
    try {
      const routeFile = path.join(routesPath, filename);
      const routeFilename = path.parse(routeFile).name;
      const routeUrl = routeFilename == "index" ? "" : routeFilename;
      const route = await import(routeFile);
      app.use(`/${routeUrl}`, route.default);
      console.log(`Route /${routeUrl} loaded correctly`);
    } catch (error: any) {
      console.log(
        `Error trying to load routes file ${filename}: ${error.message}`
      );
    }
  })
).then(() => {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
});
