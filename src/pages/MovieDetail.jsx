import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../api/api";

export default function MovieDetail() {
  const { maPhim } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    api.get("/QuanLyRap/LayThongTinLichChieuPhim", { params: { MaPhim: maPhim } })
      .then(r => setDetail(r?.data?.content)).catch(()=>{});
  }, [maPhim]);

  if (!detail) return <div className="container">Đang tải...</div>;

  const lichChieu = detail.heThongRapChieu?.flatMap(sys =>
    (sys.cumRapChieu||[]).flatMap(cr => cr.lichChieuPhim||[])
  ) || [];

  return (
    <div className="container">
      <div className="card grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4">
        <img src={detail.hinhAnh} className="w-full rounded-xl" />
        <div>
          <h2 className="text-xl font-bold">{detail.tenPhim}</h2>
          <p className="opacity-80">{detail.moTa}</p>
          <h3 className="mt-3 font-semibold">Lịch chiếu</h3>
          <div className="grid sm:grid-cols-2 gap-2 mt-2">
            {lichChieu.map(lc => (
              <NavLink key={lc.maLichChieu} className="btn" to={`/ticketroom/${lc.maLichChieu}`}>
                {new Date(lc.ngayChieuGioChieu).toLocaleString()} — {lc.tenRap}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
