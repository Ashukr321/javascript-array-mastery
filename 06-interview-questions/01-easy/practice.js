// Practice: easy interview questions
// Run: node practice.js  (silence = every check passed)

let failures = 0;
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.assert(ok, `${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
};

// 1. Reverse an array (without .reverse())
function reverseArray(arr) {
  const out = [];
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
  return out;
}
check("reverse", reverseArray([1, 2, 3, 4]), [4, 3, 2, 1]);
check("reverse empty", reverseArray([]), []);

// 2. Max and min
function maxMin(arr) {
  let max = -Infinity;
  let min = Infinity;
  for (const n of arr) {
    if (n > max) max = n;
    if (n < min) min = n;
  }
  return { max, min };
}
check("maxMin", maxMin([3, -1, 9, 4]), { max: 9, min: -1 });

// 3. Sum of an array
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0);
check("sum", sum([1, 2, 3, 4]), 10);
check("sum empty", sum([]), 0);

// 4. Remove duplicates
const removeDuplicates = (arr) => [...new Set(arr)];
check("dedupe", removeDuplicates([1, 2, 2, 3, 1]), [1, 2, 3]);

// 5. Is the array a palindrome?
function isPalindrome(arr) {
  for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) return false;
  }
  return true;
}
check("palindrome yes", isPalindrome([1, 2, 3, 2, 1]), true);
check("palindrome no", isPalindrome([1, 2, 3]), false);

// 6. Count occurrences
function countOccurrences(arr) {
  const counts = {};
  for (const x of arr) counts[x] = (counts[x] || 0) + 1;
  return counts;
}
check("count", countOccurrences(["a", "b", "a", "c", "a"]), { a: 3, b: 1, c: 1 });

// 7. Flatten one level
const flattenOnce = (arr) => [].concat(...arr);
check("flatten once", flattenOnce([1, [2, 3], [4, [5]]]), [1, 2, 3, 4, [5]]);
check("flatten once === flat()", flattenOnce([1, [2, [3]]]), [1, [2, [3]]].flat());

// 8. Second largest (distinct)
function secondLargest(arr) {
  let first = -Infinity;
  let second = -Infinity;
  for (const n of arr) {
    if (n > first) {
      second = first;
      first = n;
    } else if (n > second && n < first) {
      second = n;
    }
  }
  return second === -Infinity ? null : second;
}
check("second largest", secondLargest([10, 5, 10, 8]), 8);
check("second largest none", secondLargest([7, 7]), null);

// 9. Chunk an array
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
check("chunk", chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);

// 10. Merge two sorted arrays
function mergeSorted(a, b) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}
check("merge sorted", mergeSorted([1, 4, 7], [2, 3, 8, 9]), [1, 2, 3, 4, 7, 8, 9]);

// 11. Rotate right by k
function rotateRight(arr, k) {
  if (arr.length === 0) return [];
  k %= arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)]; // k = 0: slice(-0) is everything, slice(0, -0) is []
}
check("rotate", rotateRight([1, 2, 3, 4, 5], 2), [4, 5, 1, 2, 3]);
check("rotate k > n", rotateRight([1, 2, 3], 4), [3, 1, 2]);
check("rotate k = 0", rotateRight([1, 2, 3], 0), [1, 2, 3]);

// 12. Missing number in 1..n
function missingNumber(arr) {
  const n = arr.length + 1;
  return (n * (n + 1)) / 2 - sum(arr);
}
check("missing", missingNumber([1, 2, 4, 5, 6]), 3);

// 13. Predict the output: type coercion and default sort
check("[1,2,3]+[4]", [1, 2, 3] + [4], "1,2,34");
check("[10,1,2].sort()", [10, 1, 2].sort(), [1, 10, 2]);
check("numeric sort", [10, 1, 2].sort((a, b) => a - b), [1, 2, 10]);
check("map(parseInt)", ["1", "2", "3"].map(parseInt), [1, NaN, NaN]); // JSON turns NaN into null, still compares fine
check("map(Number)", ["1", "2", "3"].map(Number), [1, 2, 3]);

// 14. Predict the output: length and sparse arrays
const a = [1, 2, 3];
a.length = 1;
check("length truncates", a, [1]);
const b = [];
b[5] = "x";
check("sparse length", b.length, 6);
check("hole is undefined", b[0], undefined);
check("hole not 'in'", 0 in b, false);
check("[,,].length", [, ,].length, 2);

if (failures === 0) console.log("All easy checks passed.");

// --- Exercises ---
// a) Return the index of the largest element without using Math.max.
// b) Given an array of numbers, return a new array with only the even numbers squared.
// c) Check whether two arrays contain the same elements with the same counts, in any order.
