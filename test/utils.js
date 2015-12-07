

/**
 * Repeat a character N times.
 *
 * @param {String} c - A character.
 * @param {Number} n - Number of repetitions.
 */
export function repeat(c, n) {
  return Array(n).join(c).split('');
}
