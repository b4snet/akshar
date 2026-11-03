const colors = ["#263F73", "#FFFDF8", "#B83246", "#557B63", "#E8A846"];

export function PrayerFlags() {
  return (
    <svg className="prayer-flags" viewBox="0 0 720 120" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 18 C150 42 270 10 720 24" fill="none" stroke="#263F73" strokeWidth="3" />
      {colors.map((color, index) => Array.from({ length: 6 }, (_, repeat) => {
        const x = 4 + (index * 6 + repeat) * 20;
        return <path key={`${index}-${repeat}`} d={`M${x} ${18 + Math.sin((index + repeat) * .9) * 8} l18 4 l-1 44 l-17 -5 z`} fill={color} stroke="rgba(36,34,29,.18)" strokeWidth="1" style={{ transformOrigin: `${x}px 18px`, animationDelay: `${(index + repeat) * 90}ms` }} />;
      }))}
    </svg>
  );
}
