import express from "express";
import routes from "./routes/index.ts";
import cron from "node-cron";
import { hardwareLogService } from "./utils/log/service.ts";

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.status(200).send("CNS ts express backend is available.");
});

// assign url
routes.forEach((e) => {
  app.use(e.addr, e.router);
});

// scheduled hardware log service
cron.schedule("* * * * *", () => hardwareLogService());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
