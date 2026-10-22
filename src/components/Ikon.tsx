// Ikon garis sederhana (24×24, stroke currentColor). Selalu dekoratif: beri teks atau aria-label di pemanggil.

const JALUR = {
  cek: "M5 12.5l4.5 4.5L19 7.5",
  silang: "M6.5 6.5l11 11M17.5 6.5l-11 11",
  kiri: "M15 5l-7 7 7 7",
  kanan: "M9 5l7 7-7 7",
  matahari: "M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 8a4 4 0 100 8 4 4 0 000-8z",
  bulan: "M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z",
  layar: "M4 5h16v11H4zM9 20h6M12 16v4",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  buku: "M4 19V5a2 2 0 012-2h14v14H6a2 2 0 00-2 2 2 2 0 002 2h14M8 7h8",
  jam: "M12 7v5l3 2M12 3a9 9 0 100 18 9 9 0 000-18z",
  awas: "M12 9v4M12 17h.01M10.3 3.9L2.4 18a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z",
  salin: "M9 9h11v11H9zM5 15H4V4h11v1",
  unduh: "M12 4v11M7 10l5 5 5-5M5 20h14",
  panah: "M5 12h14M13 6l6 6-6 6",
  tanya: "M9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5M12 17h.01",
  simpan: "M5 4h11l3 3v13H5zM8 4v5h8V4M8 20v-6h8v6",
  ulang: "M4 12a8 8 0 0114-5.3L20 9M20 4v5h-5M20 12a8 8 0 01-14 5.3L4 15M4 20v-5h5",
  rumah: "M4 11l8-7 8 7M6 9.5V20h12V9.5",
} as const;

export type NamaIkon = keyof typeof JALUR;

export function Ikon({ nama, ukuran = 20, className }: { nama: NamaIkon; ukuran?: number; className?: string }) {
  return (
    <svg
      className={"ikon" + (className ? " " + className : "")}
      width={ukuran}
      height={ukuran}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={JALUR[nama]} />
    </svg>
  );
}
