interface GaugeChartProps {
  value: number;
  max: number;
  label: string;
}

export default function GaugeChart({ value, max, label }: GaugeChartProps) {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;

  const getColor = (percent: number) => {
    if (percent < 33) return '#ef4444';
    if (percent < 66) return '#eab308';
    return '#22c55e';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke="#fee2e2"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 10 50 A 40 40 0 0 1 90 50"
              fill="none"
              stroke={getColor(percentage)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="126"
              strokeDashoffset={126 - (126 * percentage) / 100}
              className="transition-all duration-1000"
            />
          </svg>
          <div
            className="absolute bottom-0 left-1/2 w-1 h-12 bg-gray-800 origin-bottom transition-transform duration-1000"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
          >
            <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 -mt-1 bg-gray-800 rounded-full" />
          </div>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-500">{value} / {max}</p>
    </div>
  );
}
