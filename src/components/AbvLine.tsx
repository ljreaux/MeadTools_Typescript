export default function AbvLine({
  ABV,
  delle,
}: {
  ABV: number;
  delle: number;
}) {
  return (
    <div className="flex gap-2">
      <p className="text-2xl">{Math.round(ABV * 100) / 100}% ABV</p>
      <p className="text-2xl">{Math.round(delle)} Delle Units</p>
    </div>
  );
}
