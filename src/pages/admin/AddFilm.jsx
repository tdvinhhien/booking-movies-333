import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

export default function AddFilm() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    tenPhim: "", trailer: "", moTa: "", maNhom: "GP01",
    ngayKhoiChieu: new Date().toLocaleDateString("vi-VN"),
    sapChieu: true, dangChieu: true, hot: false, danhGia: 10,
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v])=>fd.append(k,v));
    if (file) fd.append("File", file, file.name);
    setLoading(true);
    try {
      await api.post("/QuanLyPhim/ThemPhimUploadHinh", fd);
      alert("Thêm phim thành công!");
      nav("/admin/films");
    } catch (err) {
      alert("Thêm phim thất bại: " + (err?.response?.data?.content||""));
    } finally { setLoading(false); }
  };

  return (
    <form onSubmit={submit} className="card container max-w-2xl">
      <h2 className="text-xl font-bold mb-3">Thêm phim</h2>
      {["tenPhim","trailer","moTa","maNhom","ngayKhoiChieu","danhGia"].map(k=>(
        <div key={k} className="mb-2">
          <label className="block mb-1">{k}</label>
          <input className="input" value={form[k]} onChange={e=>setForm({...form, [k]: e.target.value})} />
        </div>
      ))}
      <div className="flex gap-4 my-2">
        {["sapChieu","dangChieu","hot"].map(k=>(
          <label key={k} className="flex items-center gap-2">
            <input type="checkbox" checked={form[k]} onChange={e=>setForm({...form, [k]: e.target.checked})} />
            {k}
          </label>
        ))}
      </div>
      <label className="block mb-1">Poster</label>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button className="btn-primary mt-3" disabled={loading}>{loading?"Đang gửi...":"Tạo phim"}</button>
    </form>
  );
}
