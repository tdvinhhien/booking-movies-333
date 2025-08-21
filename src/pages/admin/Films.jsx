import { useEffect, useState } from "react";
import api from "../../api/api";
import { NavLink } from "react-router-dom";

export default function Films() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    api.get("/QuanLyPhim/LayDanhSachPhim", { params: { maNhom: "GP01" } })
      .then(r => setItems(r?.data?.content||[]))
      .finally(()=>setLoading(false));
  };

  useEffect(()=>{ load(); },[]);

  const remove = async (id) => {
    if (!confirm("Xóa phim này?")) return;
    try {
      await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${id}`);
      load();
    } catch (err) {
      alert("Không xoá được: " + (err?.response?.data?.content||""));
    }
  };

  return (
    <div className="container">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">Quản lý phim</h2>
        <NavLink to="/admin/films/addnew" className="btn-primary">Thêm phim</NavLink>
      </div>
      <div className="card overflow-auto">
        {loading ? "Đang tải..." : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Mã</th>
                <th className="p-2">Poster</th>
                <th className="p-2">Tên phim</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {items.map(m => (
                <tr key={m.maPhim} className="border-t border-gray-700">
                  <td className="p-2">{m.maPhim}</td>
                  <td className="p-2"><img src={m.hinhAnh} className="h-16 rounded-lg" /></td>
                  <td className="p-2">{m.tenPhim}</td>
                  <td className="p-2">
                    <button className="btn" onClick={()=>remove(m.maPhim)}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
