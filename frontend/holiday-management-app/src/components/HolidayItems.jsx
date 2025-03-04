

const HolidayItem = ({ holiday }) => {
 return (
   <div className="border p-4 rounded mb-4">
     <p className="font-semibold">{holiday.name}</p>
     <p className="text-sm text-gray-500">{holiday.date}</p>
     <p className="text-sm">{holiday.type}</p>
   </div>
 );
};

export default HolidayItem;
