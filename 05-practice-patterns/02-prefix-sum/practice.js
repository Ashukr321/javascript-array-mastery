// Practice: prefix sum
// Run: node practice.js

// 1. Build the prefix array (leading 0)
const nums = [3, 1, 4, 1, 5, 9];
const prefix = [0];
for (const n of nums) prefix.push(prefix.at(-1) + n);
console.log("prefix:", prefix);

// 2. Range sum in O(1)
const rangeSum = (l, r) => prefix[r + 1] - prefix[l];
console.log("rangeSum(1,3):", rangeSum(1, 3), "rangeSum(0,5):", rangeSum(0, 5));

// 3. Running balance
const deposits = [100, -20, 50, -30];
let total = 0;
console.log("balance:", deposits.map((d) => (total += d)));

// 5. 2D prefix sum
const grid = [
  [1, 2],
  [3, 4],
];
const P = Array.from({ length: 3 }, () => new Array(3).fill(0));
for (let r = 0; r < 2; r++)
  for (let c = 0; c < 2; c++) P[r + 1][c + 1] = grid[r][c] + P[r][c + 1] + P[r + 1][c] - P[r][c];
const rect = (r1, c1, r2, c2) => P[r2 + 1][c2 + 1] - P[r1][c2 + 1] - P[r2 + 1][c1] + P[r1][c1];
console.log("2D whole grid:", rect(0, 0, 1, 1), "bottom row:", rect(1, 0, 1, 1));

// --- Practice question solutions ---
function makeRangeSum(arr) {
  const p = [0];
  for (const n of arr) p.push(p.at(-1) + n);
  return (l, r) => p[r + 1] - p[l];
}

function pivotIndex(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  let left = 0;
  for (let i = 0; i < arr.length; i++) {
    if (left === sum - left - arr[i]) return i;
    left += arr[i];
  }
  return -1;
}

function subarraySum(arr, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of arr) {
    sum += n;
    count += seen.get(sum - k) ?? 0;
    seen.set(sum, (seen.get(sum) ?? 0) + 1);
  }
  return count;
}

function productExceptSelf(arr) {
  const out = new Array(arr.length).fill(1);
  let left = 1;
  for (let i = 0; i < arr.length; i++) {
    out[i] = left;
    left *= arr[i];
  }
  let right = 1;
  for (let i = arr.length - 1; i >= 0; i--) {
    out[i] *= right;
    right *= arr[i];
  }
  return out;
}

function runningSum(arr) {
  let t = 0;
  return arr.map((n) => (t += n));
}

const sumRange = makeRangeSum([-2, 0, 3, -5, 2, -1]);
console.assert(rangeSum(1, 3) === 6, "rangeSum");
console.assert(rect(0, 0, 1, 1) === 10 && rect(1, 0, 1, 1) === 7, "2D prefix");
console.assert(sumRange(0, 2) === 1 && sumRange(2, 5) === -1 && sumRange(0, 5) === -3, "makeRangeSum");
console.assert(pivotIndex([1, 7, 3, 6, 5, 6]) === 3, "pivotIndex 3");
console.assert(pivotIndex([1, 2, 3]) === -1, "pivotIndex -1");
console.assert(subarraySum([1, 1, 1], 2) === 2, "subarraySum [1,1,1]");
console.assert(subarraySum([1, 2, 3], 3) === 2, "subarraySum [1,2,3]");
console.assert(subarraySum([1, -1, 0], 0) === 3, "subarraySum with negatives");
console.assert(JSON.stringify(productExceptSelf([1, 2, 3, 4])) === "[24,12,8,6]", "productExceptSelf");
console.assert(JSON.stringify(runningSum([1, 2, 3, 4])) === "[1,3,6,10]", "runningSum");
console.log("subarraySum([1,-1,0], 0):", subarraySum([1, -1, 0], 0));
console.log("productExceptSelf:", productExceptSelf([1, 2, 3, 4]));
console.log("All prefix-sum checks ran (no assertion errors above = pass).");

// --- Exercises ---
// a) Given daily step counts, answer "average steps between day l and day r" for many queries in O(1) each.
// b) Find the length of the longest subarray with sum exactly k (hint: store the FIRST index of each prefix sum).
// c) Count subarrays whose sum is divisible by k (hint: store prefix sums modulo k; watch out for negative remainders).
