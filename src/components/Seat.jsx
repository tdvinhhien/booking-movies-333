export default function Seat({ data, selected, onToggle }) {
  const isSelected = !!selected?.find((s) => s.maGhe === data.maGhe);
  const base = "w-8 h-8 rounded-lg border flex items-center justify-center text-xs";
  const booked = data.daDat ? "bg-gray-500 border-gray-500 text-gray-900 cursor-not-allowed" : "";
  const active = isSelected ? "bg-green-500 border-green-500 text-green-950" : "bg-gray-800 border-gray-700 hover:bg-gray-700";
  return (
    <button
      className={`${base} ${data.daDat ? booked : active}`}
      disabled={data.daDat}
      onClick={() => onToggle?.(data)}
      title={data.tenGhe}
    >
      {data.tenGhe}
    </button>
  );
}
