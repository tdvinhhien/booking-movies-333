import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetail from "../pages/MovieDetail";
import TicketRoom from "../pages/TicketRoom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Films from "../pages/admin/Films";
import AddFilm from "../pages/admin/AddFilm";

export default function AppRoutes({ onLoggedIn }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:maPhim" element={<MovieDetail />} />
      <Route path="/ticketroom/:maLichChieu" element={<TicketRoom />} />
      <Route path="/login" element={<Login onLoggedIn={onLoggedIn} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin/films" element={<Films />} />
      <Route path="/admin/films/addnew" element={<AddFilm />} />
    </Routes>
  );
}
