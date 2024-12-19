import express from "express";
import checkCache from "../middleware/cacheMiddlwWare.js";
import getWeather from "../controller/weatherrController.js";

const router = express.Router();

router.get("/weather/:city", checkCache, getWeather);

export default router;
