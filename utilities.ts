export function screenDots(
  count: number,
  dotThreshold: number,
  numberThreshold: number,
) {
  const encoder = new TextEncoder();
  if (numberThreshold != null && (count % numberThreshold == 0)) {
    Deno.stdout.write(encoder.encode(`${Math.floor(count / numberThreshold)}`));
  } else if (dotThreshold != null && (count % dotThreshold == 0)) {
    Deno.stdout.write(encoder.encode("."));
  }
}
