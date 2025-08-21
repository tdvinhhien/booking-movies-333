import Navbar from "./components/Navbar";
import { useAuthState } from "./utils/auth";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const { user, login, logout } = useAuthState();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={user} onLogout={logout} />
      <main className="container py-4">
        <AppRoutes onLoggedIn={login} />
      </main>
    </div>
  );
}
