
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";


export const fetchHolidays = async (country, year) => {
 
  try {
    const response = await axios.get(`${BASE_URL}/holidays/all/${country}/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return [];
  }
};
