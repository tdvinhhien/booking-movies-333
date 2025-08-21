import { useEffect, useState } from "react";
import api from "../api/api";

export default function Profile() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    api.post("/QuanLyNguoiDung/ThongTinTaiKhoan").then(r=>setData(r?.data?.content)).catch(()=>setData(null));
  },[]);

  if (!localStorage.getItem("accessToken")) return <div className="container">Vui lòng đăng nhập.</div>;

  return (
    <div className="container">
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Thông tin tài khoản</h2>
        <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
