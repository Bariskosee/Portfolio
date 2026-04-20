export default function WireframeSphere({
  size = 600,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 10;

  const latitudes = [
    { ry: r * 0.15, dy: -r * 0.7 },
    { ry: r * 0.35, dy: -r * 0.45 },
    { ry: r * 0.5,  dy: -r * 0.15 },
    { ry: r * 0.5,  dy:  r * 0.15 },
    { ry: r * 0.35, dy:  r * 0.45 },
    { ry: r * 0.15, dy:  r * 0.7 },
  ];

  const longitudes = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
    >
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />

      {latitudes.map((lat, i) => (
        <ellipse
          key={`lat-${i}`}
          cx={cx}
          cy={cy + lat.dy}
          rx={r}
          ry={lat.ry}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
        />
      ))}

      {longitudes.map((deg, i) => (
        <ellipse
          key={`lon-${i}`}
          cx={cx}
          cy={cy}
          rx={r * Math.abs(Math.cos((deg * Math.PI) / 180))}
          ry={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.4"
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}

      <circle
        cx={cx} cy={cy} r={r * 0.65}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.25"
        strokeDasharray="2 4"
      />
      <circle
        cx={cx} cy={cy} r={r * 0.35}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.25"
        strokeDasharray="2 4"
      />
    </svg>
  );
}
