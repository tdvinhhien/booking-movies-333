import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login({ onLoggedIn }) {
  const [form, setForm] = useState({ taiKhoan: "", matKhau: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    api.post("/QuanLyNguoiDung/DangNhap", form)
      .then(r => {
        const u = r?.data?.content;
        if (u?.accessToken) localStorage.setItem("accessToken", u.accessToken);
        localStorage.setItem("user", JSON.stringify(u));
        onLoggedIn?.(u);
        nav("/home");
      })
      .catch(er => setErr(er?.response?.data?.content || "Đăng nhập thất bại"))
      .finally(()=>setLoading(false));
  };

  return (
    <form onSubmit={submit} className="card container max-w-md">
      <h2 className="text-xl font-bold mb-3">Đăng nhập</h2>
      <label className="block mb-1">Tài khoản</label>
      <input className="input mb-3" value={form.taiKhoan} onChange={e=>setForm({...form, taiKhoan:e.target.value})} required />
      <label className="block mb-1">Mật khẩu</label>
      <input type="password" className="input mb-3" value={form.matKhau} onChange={e=>setForm({...form, matKhau:e.target.value})} required />
      {err && <div className="text-red-400 mb-2">{err}</div>}
      <button className="btn-primary" disabled={loading}>{loading? "Đang xử lý..." : "Đăng nhập"}</button>
    </form>
  );
}
