import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

const BillsCard = () => {
  return (
    <div className="p-5 bg-white rounded-md shadow-card">
      <div className="flex flex-row justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-md">
          <EventNoteOutlinedIcon />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-gray-600 text-sm font-medium">Upcoming Bills</h3>
        <p className="font-bold text-2xl">$3,456</p>
        <p className="text-gray-400 text-xs mt-1">5 bills due this week</p>
      </div>
    </div>
  );
};

export default BillsCard;
