import createRedisClient from "../utils/redisClient.js";

const checkCache = async (req, res, next) => {
  const { city } = req.params;

  if (!city || typeof city !== "string") {
    console.error("Invalid or missing city parameter.");
    return res
      .status(400)
      .json({ error: "Invalid or missing city parameter." });
  }

  try {
    const redisClient = await createRedisClient();
    const data = await redisClient.get(city);

    if (data) {
      console.log(`Cache hit for city: ${city}`);
      return res.status(200).json({ source: "cache", data: JSON.parse(data) });
    } else {
      console.log(`Cache miss for city: ${city}`);
      next();
    }
  } catch (err) {
    console.error("Error checking cache:", err.message);
    next(err);
  }
};

export default checkCache;
