function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function DemoQR({ value = "DEMO-PAYMENT" }) {
  const size = 21;
  const cells = [];

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const inFinder =
        (r < 7 && c < 7) ||
        (r < 7 && c >= size - 7) ||
        (r >= size - 7 && c < 7);

      let filled;
      if (inFinder) {
        const lr = r % 7 === 0 || r % 7 === 6;
        const lc = c % 7 === 0 || c % 7 === 6;
        filled =
          lr ||
          lc ||
          (r % 7 >= 2 && r % 7 <= 4 && c % 7 >= 2 && c % 7 <= 4);
      } else {
        filled = hash(`${value}:${r}:${c}`) % 3 === 0;
      }

      cells.push(filled);
    }
  }

  return (
    <div className="demo-qr">
      {cells.map((filled, i) => (
        <div
          key={i}
          className={filled ? "qr-cell qr-dark" : "qr-cell"}
        />
      ))}
    </div>
  );
}

export default DemoQR;
