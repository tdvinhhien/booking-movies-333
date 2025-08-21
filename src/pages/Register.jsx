import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({ taiKhoan:"", matKhau:"", email:"", soDt:"", maNhom:"GP01", hoTen:"" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    setLoading(true); setErr("");
    api.post("/QuanLyNguoiDung/DangKy", form)
      .then(()=> nav("/login"))
      .catch(er => setErr(er?.response?.data?.content || "Đăng ký thất bại"))
      .finally(()=>setLoading(false));
  };

  return (
    <form onSubmit={submit} className="card container max-w-lg">
      <h2 className="text-xl font-bold mb-3">Đăng ký</h2>
      {["taiKhoan","matKhau","email","soDt","hoTen"].map(k => (
        <div key={k} className="mb-2">
          <label className="block mb-1">{k}</label>
          <input className="input" type={k==="matKhau"?"password":"text"} value={form[k]} onChange={e=>setForm({...form, [k]: e.target.value})} required />
        </div>
      ))}
      <label className="block mb-1">Mã nhóm</label>
      <input className="input mb-3" value={form.maNhom} onChange={e=>setForm({...form, maNhom:e.target.value})} />
      {err && <div className="text-red-400 mb-2">{err}</div>}
      <button className="btn-primary" disabled={loading}>{loading? "Đang xử lý..." : "Tạo tài khoản"}</button>
    </form>
  );
}
