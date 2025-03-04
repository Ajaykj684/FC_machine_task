import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import ListPage from "./screens/ListPage";
import CalendarPage from "./screens/CalenderPage";
// import HolidayDetailPage from "./screens/HolidayDetailPage";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App
