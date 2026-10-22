interface Props {
  id: string;
  label: string;
  petunjuk: string;
  nilai: string;
  baris: number;
  onUbah: (teks: string) => void;
}

function hitungKata(t: string): number {
  const s = t.trim();
  return s ? s.split(/\s+/).length : 0;
}

export function KotakJawaban({ id, label, petunjuk, nilai, baris, onUbah }: Props) {
  return (
    <div className="bca-isian">
      <label className="bca-isian-label" htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className="bca-textarea"
        rows={baris}
        value={nilai}
        placeholder={petunjuk}
        spellCheck
        onChange={(e) => onUbah(e.target.value)}
      />
      <span className="bca-isian-meta">{hitungKata(nilai)} kata</span>
    </div>
  );
}
