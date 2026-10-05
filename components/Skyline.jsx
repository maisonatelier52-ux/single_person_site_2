// Dark city-skyline artwork used as a tile / card background. `seed` changes the silhouette.
export default function Skyline({ seed = 1, className = "" }) {
  let s = seed * 9301 + 49297;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const buildings = [];
  for (let x = 0; x < 400; ) {
    const w = 10 + Math.floor(rnd() * 22);
    const h = 18 + Math.floor(rnd() * 70);
    buildings.push({ x, w, h });
    x += w + 1;
  }
  return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none" aria-hidden="true" className={className}>
      {buildings.map((b, i) => (
        <rect key={i} x={b.x} y={100 - b.h} width={b.w} height={b.h} fill={i % 3 ? "#1d1d1d" : "#2b2b2b"} />
      ))}
    </svg>
  );
}
