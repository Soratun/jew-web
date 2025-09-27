// gdrive helpers (ถ้ายังไม่มี)
function extractDriveId(url: string): string | null {
  try {
    const u = new URL(url);
    const m1 = u.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m1?.[1]) return m1[1];
    const id = u.searchParams.get('id');
    if (id) return id;
    return null;
  } catch { return null; }
}

/**
 * แปลงลิงก์แชร์ Google Drive -> ลิงก์ที่ <img> โหลดได้
 * mode:
 *  - 'thumb' (แนะนำ): ใช้รูปย่อและกำหนดขนาดได้ เร็วกว่า
 *  - 'view': ใช้ไฟล์ต้นฉบับ (ช้ากว่า/โหลดใหญ่)
 */
export function driveToDirect(
  url: string,
  mode: 'thumb' | 'view' = 'thumb',
  size = 1000
): string {
  const id = extractDriveId(url);
  if (!id) return url; // ถ้าไม่ใช่ลิงก์ Drive ให้คืนค่าเดิมไป

  return mode === 'thumb'
    ? `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`
    : `https://drive.google.com/uc?export=view&id=${id}`;
}


export function driveCandidates(url: string, size = 1000): string[] {
  const id = extractDriveId(url);
  if (!id) return [url];
  return [
    `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`, // 1) thumb
    `https://drive.google.com/uc?export=view&id=${id}`,        // 2) view
    url                                                        // 3) original
  ];
}

