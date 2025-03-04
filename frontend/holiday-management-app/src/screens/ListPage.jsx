import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

const ListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { holidays, country, year } = location.state || {}; 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);

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
       <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mx-auto text-center">
         Holidays in {country} for {year}
       </h1>
     </nav>


      <div className="p-6 pt-20">

        {holidays && holidays.length > 0 ? (
          <ul className="space-y-2">
            {holidays.map((holiday, index) => (
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
          <p>No holidays found for {country} in {year}.</p>
        )}
      </div>

      {/* Modal to display holiday in detail */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} holiday={selectedHoliday} />
    </div>
  );
};

export default ListPage;
