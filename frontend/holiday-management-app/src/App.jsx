import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./screens/HomePage";
import ListPage from "./screens/ListPage";
// import HolidayDetailPage from "./screens/HolidayDetailPage";
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        {/* <Route path="/holiday-detail" element={<HolidayDetailPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App
