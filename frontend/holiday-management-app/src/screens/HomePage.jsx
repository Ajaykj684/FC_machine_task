import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchHolidays } from "../api/holidays";  

const HomePage = () => {
  const [country, setCountry] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");

    if (!country || !year) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const data = await fetchHolidays(country, year);
      console.log(data);

      navigate("/list", {
       state: { holidays: data, country, year },
     });
     
    } catch (error) {
      setError(error.message); 
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Search Holidays</h1>
      
      {error && <div className="text-red-500 mb-2">{error}</div>}

      <input
        type="text"
        placeholder="Country Code (e.g., US)"
        className="border p-2 w-64 mb-2 rounded"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />
      
      <input
        type="number"
        placeholder="Year (e.g., 2024)"
        className="border p-2 w-64 mb-4 rounded"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-6 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Search"}
      </button>
    </div>
  );
};

export default HomePage;
