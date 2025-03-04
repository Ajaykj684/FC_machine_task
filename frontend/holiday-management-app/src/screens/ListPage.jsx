import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { searchInHolidays } from "../api/holidays";

const ListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { holidays, country, year } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHolidays, setFilteredHolidays] = useState(holidays);
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleBack = () => {
    navigate(-1); // back button
  };

  const handleHolidayClick = (holiday) => {
    setSelectedHoliday(holiday);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHoliday(null);
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const response = await searchInHolidays({ country, year, searchTerm });
      setFilteredHolidays(response);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const handleShowAll = () => {
    setFilteredHolidays(holidays);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleTypeFilter = (event) => {
    const selected = event.target.value;
    setSelectedType(selected);

    const filtered = selected
      ? holidays.filter((holiday) => holiday.type.includes(selected))
      : holidays;

    setFilteredHolidays(filtered);
    setCurrentPage(1);
  };

  const indexOfLastHoliday = currentPage * itemsPerPage;
  const indexOfFirstHoliday = indexOfLastHoliday - itemsPerPage;
  const currentHolidays = filteredHolidays.slice(indexOfFirstHoliday, indexOfLastHoliday);

  const totalPages = Math.ceil(filteredHolidays.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen w-screen justify-content-center align-items-center flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-500 p-4 flex items-center justify-between text-white z-10">
        <button
          onClick={handleBack}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
        <h className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mx-auto text-center">
          Holidays in {country} for {year}
        </h>
      </nav>

      <div className="p-6 mt-20 sm:mt-24 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">

        <div className="flex flex-col md:mr-6 sm:flex-row sm:space-x-4 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={handleTypeFilter}
            className="border p-2 rounded mb-4 sm:mb-0 w-full sm:w-auto text-white !bg-black"
          >
            <option value="">Select Type</option>
            <option value="Local holiday">Local Holiday</option>
            <option value="State holiday">State Holiday</option>
            <option value="National holiday">National Holiday</option>
          </select>
        </div>

        {/* Search  */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search holidays"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 w-full sm:w-64 rounded mb-4 sm:mb-0"
          />
          <button
            onClick={handleSearch}
            className="md:ml-1 bg-blue-500 text-white px-6 py-2 rounded w-full sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* Show All Button */}
        <button
          onClick={handleShowAll}
          className="md:ml-10 !bg-green-500 text-white px-6 rounded w-full sm:w-auto"
        >
          Show All
        </button>
      </div>

      {/* Holidays List */}
      <div className="p-6 flex items-center justify-center">
        {currentHolidays.length > 0 ? (
          <ul className="space-y-2">
            {currentHolidays.map((holiday, index) => (
              <li
                key={index}
                onClick={() => handleHolidayClick(holiday)}
                className="cursor-pointer text-blue-500 hover:underline"
              >
                {holiday.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-center">No holidays found for {country} in {year}.</p>
          </div>        
         )}
      </div>

      {/* Pagination */}
      <div className="p-6 flex justify-center items-center space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-xl">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Modal to display holiday in detail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} holiday={selectedHoliday} />
    </div>
  );
};

export default ListPage;
