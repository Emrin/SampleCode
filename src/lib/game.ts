
// A helper that calculates relative score (0-100) for the guessed extinction year.
// This implementation awards 100 points for an exact guess, and reduces points
// proportionally to the relative error (difference divided by |actual year|).
export function calculateYearPoints(actualYear: number, guessedYear: number): number {
  const error = Math.abs(guessedYear - actualYear);
  // Use absolute actual year to avoid division by zero (assuming extinction year ≠ 0).
  const relativeError = error / Math.abs(actualYear);
  // Scale: if relative error is 0, full 100 points, if error equals or exceeds actual, 0 points.
  const points = Math.max(0, 100 * (1 - relativeError));
  return Math.round(points);
}
