interface Props {
  pertama: boolean;
  terakhir: boolean;
  onMundur: () => void;
  onMaju: () => void;
  onSelesai: () => void;
}

export function AksiUjian({ pertama, terakhir, onMundur, onMaju, onSelesai }: Props) {
  return (
    <div className="aksi-ujian">
      <button className="tombol hantu" disabled={pertama} onClick={onMundur}>&larr; Sebelumnya</button>
      <button className="tombol hantu" disabled={terakhir} onClick={onMaju}>Berikutnya &rarr;</button>
      <button className="tombol kanan" onClick={onSelesai}>Selesaikan sekarang</button>
    </div>
  );
}
