import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../api/api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.get("/QuanLyPhim/LayDanhSachPhim", { params: { maNhom: "GP01" } })
      .then((res) => setMovies(res.data.content || []))
      .catch(() => {});
  }, []);

  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/QuanLyPhim/LayDanhSachBanner");
        setBanners(res.data.content); 
      } catch (err) {
        console.error("Lỗi load banner:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="container">
      <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="rounded-xl shadow-lg"
      >
        {banners.map((movie) => (
          <SwiperSlide key={movie.maPhim}>
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      <h2 className="text-2xl font-bold mb-4">Danh sách phim</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((m) => (
          <div key={m.maPhim} className="card">
            <img src={m.hinhAnh} alt={m.tenPhim} className="w-full h-56 object-cover rounded-xl" />
            <div className="flex items-center justify-between mt-2">
              <div className="font-semibold">{m.tenPhim}</div>
              <NavLink to={`/detail/${m.maPhim}`} className="btn-primary">Chi tiết</NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
