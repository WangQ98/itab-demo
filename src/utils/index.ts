// 生成uuid
export function generateUid() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 32; i++) {
    s[i] = hexDigits.slice(
      Math.floor(Math.random() * 0x10),
      Math.floor(Math.random() * 0x10) + 1
    );
  }
  s[14] = "4";
  s[19] = hexDigits.slice((s[19] & 0x3) | 0x8, (s[19] & 0x3) | (0x8 + 1));

  const uuid = s.join("");
  return uuid;
}
