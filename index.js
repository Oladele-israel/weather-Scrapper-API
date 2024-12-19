import express from "express";
import "dotenv/config";
import router from "./router/weather.routes.js";
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully!" });
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
