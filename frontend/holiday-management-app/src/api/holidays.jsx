
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";


// API to fetch all holidays
export const fetchHolidays = async (country, year) => {
 
  try {
    const response = await axios.get(`${BASE_URL}/holidays/all/${country}/${year}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return [];
  }
};



// API to search 
export const searchInHolidays = async ({country, year, searchTerm}) => {
 
 try {
   const response = await axios.get(`${BASE_URL}/holidays/search_holidays/${country}/${year}/${searchTerm}`);
   return response.data;
 } catch (error) {
   console.error("Error fetching holidays:", error);
   return [];
 }
};


export const fetchHolidaysByDate = async (country, year, month, day) => {

 try {
  
   const response = await axios.get(`${BASE_URL}/holidays/holiday_by_date/${country}/${year}/${month}/${day}`);
   return response.data;
  
 } catch (error) {
   console.error("Error fetching holidays:", error);
   return [];
 }
};