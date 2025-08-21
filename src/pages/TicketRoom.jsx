import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Seat from "../components/Seat";

export default function TicketRoom() {
  const { maLichChieu } = useParams();
  const [room, setRoom] = useState(null);
  const [selected, setSelected] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    api.get("/QuanLyDatVe/LayDanhSachPhongVe", { params: { MaLichChieu: maLichChieu } })
      .then(r => setRoom(r?.data?.content||null))
      .catch(err => alert("Không tải được phòng vé: " + (err?.response?.data?.content||"")));
  }, [maLichChieu]);

  const toggle = (g) => {
    if (g.daDat) return;
    setSelected(old => {
      const existed = old.find(x => x.maGhe === g.maGhe);
      if (existed) return old.filter(x => x.maGhe !== g.maGhe);
      return [...old, { maGhe: g.maGhe, tenGhe: g.tenGhe, giaVe: g.giaVe }];
    });
  };

  const total = useMemo(() => selected.reduce((s,x)=>s+(x.giaVe||0),0), [selected]);

  const book = () => {
    const tk = localStorage.getItem("accessToken");
    if (!tk) { alert("Cần đăng nhập để đặt vé!"); nav("/login"); return; }
    const payload = {
      maLichChieu: Number(maLichChieu),
      danhSachVe: selected.map(s => ({ maGhe: s.maGhe, giaVe: s.giaVe })),
    };
    api.post("/QuanLyDatVe/DatVe", payload)
      .then(() => {
        alert("Đặt vé thành công!");
        setSelected([]);
        return api.get("/QuanLyDatVe/LayDanhSachPhongVe", { params: { MaLichChieu: maLichChieu } });
      })
      .then(r => setRoom(r?.data?.content||null))
      .catch(err => alert("Lỗi đặt vé: " + (err?.response?.data?.content||"")));
  };

  if (!room) return <div className="container">Đang tải phòng vé...</div>;

  const { danhSachGhe = [], thongTinPhim = {} } = room;

  return (
    <div className="container">
      <div className="card mb-3">
        <strong>{thongTinPhim.tenPhim}</strong> • {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
        <div className="opacity-80">{thongTinPhim.diaChi}</div>
      </div>

      <div className="card">
        <div className="h-1.5 bg-gray-600 rounded-full my-3" />
        <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 gap-1.5 justify-items-center">
          {danhSachGhe.map(g => (
            <Seat key={g.maGhe} data={g} selected={selected} onToggle={toggle} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>Đang chọn: <b>{selected.map(s=>s.tenGhe).join(", ")||"—"}</b></div>
          <div>Tổng tiền: <b>{total.toLocaleString()}đ</b></div>
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <button className="btn" onClick={()=>window.history.back()}>Quay lại</button>
          <button className="btn-primary disabled:opacity-50" disabled={!selected.length} onClick={book}>Đặt vé</button>
        </div>
      </div>
    </div>
  );
}
