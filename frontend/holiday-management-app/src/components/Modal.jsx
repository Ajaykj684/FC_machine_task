
const Modal = ({ isOpen, onClose, holiday }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <h2 className="text-xl font-bold mb-4 text-black">{holiday?.name}</h2>
        <p className="text-gray-700 mb-4">
          <strong>Date:</strong> {holiday?.date?.iso || holiday?.date?.datetime}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Description:</strong> {holiday?.description || "No description available."}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Type:</strong> {holiday?.type[0] || "No type available."}
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
