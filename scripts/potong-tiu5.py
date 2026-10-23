# Potong soal TIU 5 dari halaman 2-3 "Jawaban BCA Finance Update.pdf" menjadi 8 PNG per soal
# (A, B, C, 1-5) di public/bca-tiu5/. Watermark abu-abu (~176-190) dibuang dengan ambang;
# garis hitam dipertahankan. Setiap goresan (komponen terhubung) dimasukkan ke sel soal/kolom
# terdekat, lalu disalin ke kanvas persegi yang ukurannya sama untuk satu soal supaya skala
# antar-gambar tetap sama.
#
#   pip install pymupdf pillow numpy
#   python scripts/potong-tiu5.py "Jawaban BCA Finance Update.pdf" public/bca-tiu5
import sys, json
from collections import deque
from PIL import Image
import numpy as np

AMBANG = 165   # piksel lebih terang dari ini dianggap latar/watermark -> putih
INK = 150      # piksel lebih gelap dari ini dianggap tinta untuk segmentasi
PDF, OUT = sys.argv[1], sys.argv[2]

HAL = {
    'p02': dict(nomor=range(1, 16), header=304, kiri=250,
                baris=[355,444,533,624,713,802,893,982,1073,1178,1308,1402,1494,1588,1681],
                kolom=[322,423,605,789,890,979,1068,1174]),
    'p03': dict(nomor=range(16, 31), header=261, kiri=285,
                baris=[357,451,545,638,732,837,927,1015,1104,1193,1282,1372,1462,1551,1640],
                kolom=[326,427,609,793,894,982,1072,1178]),
}
NAMA_KOLOM = ['a', 'b', 'c', '1', '2', '3', '4', '5']

def komponen(mask):
    h, w = mask.shape
    lab = np.zeros((h, w), np.int32)
    n = 0
    ys, xs = np.nonzero(mask)
    info = []
    for y0, x0 in zip(ys, xs):
        if lab[y0, x0]:
            continue
        n += 1
        q = deque([(y0, x0)]); lab[y0, x0] = n
        pts = []
        while q:
            y, x = q.popleft(); pts.append((y, x))
            for dy in (-1, 0, 1):
                for dx in (-1, 0, 1):
                    yy, xx = y + dy, x + dx
                    if 0 <= yy < h and 0 <= xx < w and mask[yy, xx] and not lab[yy, xx]:
                        lab[yy, xx] = n; q.append((yy, xx))
        p = np.array(pts)
        info.append(dict(id=n, n=len(pts), y=p[:, 0].mean(), x=p[:, 1].mean(),
                         y0=p[:, 0].min(), y1=p[:, 0].max(), x0=p[:, 1].min(), x1=p[:, 1].max()))
    return lab, info

def halaman(nomor):
    import fitz
    d = fitz.open(PDF)
    pix = fitz.Pixmap(d, d[nomor - 1].get_images()[0][0])  # tiap halaman = satu gambar scan
    if pix.n > 3:
        pix = fitz.Pixmap(fitz.csRGB, pix)
    return Image.frombytes('RGB' if pix.n == 3 else 'L', (pix.width, pix.height), pix.samples).convert('L')

laporan = {}
for hal, cfg in HAL.items():
    g = np.array(halaman(int(hal[1:]))).astype(np.int32)
    area = np.zeros_like(g, bool)
    area[cfg['header'] + 8:1800, cfg['kiri']:1260] = True  # di kiri batas ini ada label nomor soal
    lab, info = komponen((g < INK) & area)
    pusat_baris = [b + 12 for b in cfg['baris']]
    sel = {}  # (baris, kolom) -> daftar komponen
    kecil = []
    for c in info:
        if c['n'] < 30:      # bintik noise hasil scan (titik soal asli > 60 piksel)
            kecil.append((c['n'], int(c['x']), int(c['y'])))
            continue
        r = int(np.argmin([abs(c['y'] - y) for y in pusat_baris]))
        k = int(np.argmin([abs(c['x'] - x) for x in cfg['kolom']]))
        sel.setdefault((r, k), []).append(c)
    for r, nomor in enumerate(cfg['nomor']):
        isi = [sel.get((r, k), []) for k in range(8)]
        kosong = [NAMA_KOLOM[k] for k in range(8) if not isi[k]]
        # ukuran kanvas seragam per soal supaya skala antar-gambar sama
        setengah = 0
        kotak = []
        for k in range(8):
            cs = isi[k]
            if not cs:
                kotak.append(None); continue
            x0 = min(c['x0'] for c in cs); x1 = max(c['x1'] for c in cs)
            y0 = min(c['y0'] for c in cs); y1 = max(c['y1'] for c in cs)
            cx = (x0 + x1) / 2
            kotak.append((cx, x0, x1, y0, y1))
            setengah = max(setengah, cx - x0 + 1, x1 - cx + 1, pusat_baris[r] - y0 + 1, y1 - pusat_baris[r] + 1)
        S = int(2 * setengah + 24)
        for k in range(8):
            kanvas = np.full((S, S), 255, np.uint8)
            if kotak[k]:
                cx = kotak[k][0]
                ox = int(round(S / 2 - cx)); oy = int(round(S / 2 - pusat_baris[r]))
                ids = {c['id'] for c in isi[k]}
                m = np.isin(lab, list(ids))
                # sertakan tepi anti-alias di sekitar goresan
                d = m.copy()
                for dy in (-1, 0, 1):
                    for dx in (-1, 0, 1):
                        d |= np.roll(np.roll(m, dy, 0), dx, 1)
                ys, xs = np.nonzero(d)
                v = g[ys, xs]
                v = np.where(v > AMBANG, 255, np.clip(v * 255 // AMBANG - 40, 0, 255))
                kanvas[ys + oy, xs + ox] = v.astype(np.uint8)
            Image.fromarray(kanvas).save(f'{OUT}/tiu5-{nomor:02d}-{NAMA_KOLOM[k]}.png', optimize=True)
        laporan[nomor] = dict(ukuran=S, kosong=kosong, komponen=[len(x) for x in isi], terkecil=min(c['n'] for x in isi for c in x))
    print(hal, 'dibuang', sorted(kecil, reverse=True)[:12], file=sys.stderr)
print(json.dumps(laporan))
