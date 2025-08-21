import { NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <header className="navbar">
      <NavLink to="/home" className="logo">🎬 Booking Movie</NavLink>
      <nav className="flex items-center gap-3">
        <NavLink to="/home">Home</NavLink>
        {user ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/admin/films">Admin</NavLink>
            <button className="btn" onClick={onLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Đăng nhập</NavLink>
            <NavLink to="/register">Đăng ký</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
