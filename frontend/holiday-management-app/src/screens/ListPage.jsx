import { useLocation, useNavigate } from "react-router-dom";

const ListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { holidays, country, year } = location.state || {}; 

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div>
      
      {/* navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-500 p-4 flex items-center justify-between text-white z-10">
        <button
          onClick={handleBack}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold absolute left-1/2 transform -translate-x-1/2">
          Holidays in {country} for {year}
        </h1>
      </nav>

      <div className="p-6 pt-20">

        {holidays && holidays.length > 0 ? (
          <table className="min-w-full border-collapse mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">Holiday Name</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{holiday.name}</td>
                  <td className="border px-4 py-2">
                    {holiday.date?.iso || holiday.date?.datetime || "No Date Available"}
                  </td>
                  <td className="border px-4 py-2">
                    {holiday.description || "No description available"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No holidays found for {country} in {year}.</p>
        )}
      </div>
    </div>
  );
};

export default ListPage;
