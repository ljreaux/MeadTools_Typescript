export default function AbvLine({
  ABV,
  delle,
}: {
  ABV: number;
  delle: number;
}) {
  return (
    <>
      <p>{Math.round(ABV * 100) / 100}% ABV</p>
      <p>{Math.round(delle)} Delle Units</p>
    </>
  );
}
