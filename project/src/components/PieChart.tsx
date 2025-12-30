interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
}

export default function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;

    return {
      ...item,
      percentage,
      startAngle,
      endAngle: currentAngle,
    };
  });

  const createArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(size / 2, size / 2, size / 2 - 10, endAngle);
    const end = polarToCartesian(size / 2, size / 2, size / 2 - 10, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return `M ${size / 2} ${size / 2} L ${start.x} ${start.y} A ${size / 2 - 10} ${size / 2 - 10} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((slice, index) => (
          <path
            key={index}
            d={createArc(slice.startAngle, slice.endAngle)}
            fill={slice.color}
            className="transition-all duration-500 hover:opacity-80"
          />
        ))}
      </svg>
      <div className="mt-4 space-y-2 w-full">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-gray-700">{slice.label}</span>
            </div>
            <span className="font-semibold text-gray-900">{slice.percentage.toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
