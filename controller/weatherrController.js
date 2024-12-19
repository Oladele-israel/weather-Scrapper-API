import getWeatherData from "../services/weatherService.js";
import createRedisClient from "../utils/redisClient.js";
const CACHE_EXPIRATION = parseInt(process.env.CACHE_EXPIRATION, 10) || 120;

const getWeather = async (req, res) => {
  const { city } = req.params;

  if (!city || typeof city !== "string") {
    return res.status(400).json({
      success: false,
      message: "City must be a valid string.",
    });
  }

  try {
    console.log(`Fetching weather data for city: ${city}`);

    const weatherInfo = await getWeatherData(city);

    const redisClient = await createRedisClient();
    await redisClient.set(city, JSON.stringify(weatherInfo), {
      EX: CACHE_EXPIRATION || 120,
    });

    console.log(`Cached weather data for city: ${city}`);

    return res.status(200).json({
      success: true,
      data: weatherInfo,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export default getWeather;
