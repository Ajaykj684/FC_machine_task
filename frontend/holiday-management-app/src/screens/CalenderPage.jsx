import { useState, useEffect } from "react";
import { fetchHolidaysByDate } from "../api/holidays";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [holidays, setHolidays] = useState([]);
  const [country, setCountry] = useState("US");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      setError("");

      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

      const data = await fetchHolidaysByDate(country, year, month, day);
      setHolidays(data);

      setLoading(false);
    };

    fetchHolidays();
  }, [selectedDate, country]);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen w-full p-4 bg-gray-900 text-white">

      <div className="w-full lg:w-1/3 p-4  text-black">
        <h2 className="text-xl font-bold mb-2  text-white">Select a Country</h2>
        <select
          className="border p-2 w-full mb-4 text-white bg-gray-800 rounded-md focus:outline-none"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          
        </select>

        <h2 className="text-xl font-bold mb-2  text-white">Select a Date</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
      </div>

      <div className="w-full lg:w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">Holidays on {selectedDate.toDateString()}</h2>

        {loading && <p className="text-yellow-400">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-800 text-green-400">
                <th className="border border-gray-600 px-4 py-2">Holiday Name</th>
                <th className="border border-gray-600 px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {holidays.length > 0 ? (
                holidays.map((holiday, index) => (
                  <tr key={index} className="text-center bg-gray-700 hover:bg-gray-600 transition">
                    <td className="border border-gray-600 px-4 py-2">{holiday.name}</td>
                    <td className="border border-gray-600 px-4 py-2">{holiday.type.join(", ")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-400">No holidays found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
