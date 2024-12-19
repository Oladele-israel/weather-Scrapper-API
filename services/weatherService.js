import axios from "axios";

const getWeatherData = async (city) => {
  try {
    const url = `${process.env.WEATHER_API_URL}/${city}?key=${process.env.WEATHER_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("failed to retrive data ");
  }
};

export default getWeatherData;
