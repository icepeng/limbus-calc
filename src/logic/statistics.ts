// get n choose r
export function nCr(n: number, r: number) {
  let result = 1;
  for (let i = 1; i <= r; i++) {
    result *= (n - i + 1) / i;
  }
  return result;
}

// get probability of getting k heads in n coins
export function binom(n: number, k: number, headRatio: number) {
  return nCr(n, k) * Math.pow(headRatio, k) * Math.pow(1 - headRatio, n - k);
}

export function normalizeProbs(...probs: number[]) {
  const sum = probs.reduce((acc, cur) => acc + cur, 0);

  if (sum === 0) {
    return probs;
  }

  return probs.map((prob) => prob / sum);
}
