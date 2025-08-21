import { useState } from "react";

export function useAuthState() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  });

  const login = (u) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
    if (u?.accessToken) localStorage.setItem("accessToken", u.accessToken);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return { user, login, logout };
}
