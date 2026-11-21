# Easy Interview Questions

These are the warm-up array questions you will meet in almost every JavaScript interview. Try each one yourself before opening the solution. Interviewers care less about the one-liner and more about whether you can explain the cost and the edge cases (empty array, duplicates, negative numbers).

All solutions are in `practice.js`, with checks that prove they work. Run it with `node practice.js`.

## 1. Reverse an array

Reverse an array **without** using `.reverse()`.

```js
reverseArray([1, 2, 3, 4]); // [4, 3, 2, 1]
```

<details>
<summary>Solution</summary>

```js
function reverseArray(arr) {
  const out = [];
  for (let i = arr.length - 1; i >= 0; i--) out.push(arr[i]);
  return out;
}
```

**Time:** O(n) · **Space:** O(n)

**Follow-up:** "Do it in place" - swap `arr[i]` and `arr[j]` with two pointers moving toward the middle (O(1) space). Remember `.reverse()` itself mutates the array.

</details>

## 2. Find the max and min

Return the largest and smallest number in one pass.

```js
maxMin([3, -1, 9, 4]); // { max: 9, min: -1 }
```

<details>
<summary>Solution</summary>

```js
function maxMin(arr) {
  let max = -Infinity;
  let min = Infinity;
  for (const n of arr) {
    if (n > max) max = n;
    if (n < min) min = n;
  }
  return { max, min };
}
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** `Math.max(...arr)` is shorter but throws a RangeError on very large arrays (too many arguments), and `Math.max()` of an empty array is `-Infinity`.

</details>

## 3. Sum of an array

```js
sum([1, 2, 3, 4]); // 10
```

<details>
<summary>Solution</summary>

```js
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0);
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** always pass the initial value `0`. Without it, `[].reduce(...)` throws a TypeError.

</details>

## 4. Remove duplicates

```js
removeDuplicates([1, 2, 2, 3, 1]); // [1, 2, 3]
```

<details>
<summary>Solution</summary>

```js
const removeDuplicates = (arr) => [...new Set(arr)];
```

**Time:** O(n) · **Space:** O(n)

**Follow-up:** "Without a Set" - `arr.filter((x, i) => arr.indexOf(x) === i)` works but is O(n²) and drops `NaN`. For objects, dedupe by a key with a `Map` (see `07-real-world-usecases/01-deduplication`).

</details>

## 5. Is the array a palindrome?

Return `true` if the array reads the same forwards and backwards.

```js
isPalindrome([1, 2, 3, 2, 1]); // true
isPalindrome([1, 2, 3]); // false
```

<details>
<summary>Solution</summary>

```js
function isPalindrome(arr) {
  for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) return false;
  }
  return true;
}
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** `arr.join() === [...arr].reverse().join()` looks clever but breaks for elements that contain commas and uses O(n) extra space.

</details>

## 6. Count occurrences

Count how many times each value appears.

```js
countOccurrences(["a", "b", "a", "c", "a"]); // { a: 3, b: 1, c: 1 }
```

<details>
<summary>Solution</summary>

```js
function countOccurrences(arr) {
  const counts = {};
  for (const x of arr) counts[x] = (counts[x] || 0) + 1;
  return counts;
}
```

**Time:** O(n) · **Space:** O(k) for k distinct values

**Gotcha:** object keys are strings, so `1` and `"1"` are counted together. Use a `Map` if the type matters.

</details>

## 7. Flatten one level

```js
flattenOnce([1, [2, 3], [4, [5]]]); // [1, 2, 3, 4, [5]]
```

<details>
<summary>Solution</summary>

```js
const flattenOnce = (arr) => [].concat(...arr);
// or simply: arr.flat()
```

**Time:** O(n) · **Space:** O(n)

**Follow-up:** "Flatten every level" - that is a medium question (recursion or a stack), or just `arr.flat(Infinity)`.

</details>

## 8. Second largest number

Return the second largest **distinct** value, or `null` if there is none.

```js
secondLargest([10, 5, 10, 8]); // 8
secondLargest([7, 7]); // null
```

<details>
<summary>Solution</summary>

```js
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
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** sorting and taking `arr[arr.length - 2]` is O(n log n) and returns `10` for `[10, 5, 10, 8]` because of the duplicate.

</details>

## 9. Chunk an array

Split an array into groups of `size`.

```js
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

<details>
<summary>Solution</summary>

```js
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
```

**Time:** O(n) · **Space:** O(n)

**Gotcha:** guard against `size <= 0`, otherwise the loop never ends.

</details>

## 10. Merge two sorted arrays

Merge two sorted arrays into one sorted array.

```js
mergeSorted([1, 4, 7], [2, 3, 8, 9]); // [1, 2, 3, 4, 7, 8, 9]
```

<details>
<summary>Solution</summary>

```js
function mergeSorted(a, b) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}
```

**Time:** O(n + m) · **Space:** O(n + m)

**Follow-up:** `[...a, ...b].sort((x, y) => x - y)` works but is O((n + m) log(n + m)) and ignores that the inputs are already sorted, which is the whole point of the question.

</details>

## 11. Rotate an array by k

Rotate the array to the right by `k` steps.

```js
rotateRight([1, 2, 3, 4, 5], 2); // [4, 5, 1, 2, 3]
```

<details>
<summary>Solution</summary>

```js
function rotateRight(arr, k) {
  if (arr.length === 0) return [];
  k %= arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}
```

**Time:** O(n) · **Space:** O(n)

**Gotcha:** always do `k %= arr.length`, since `k` can be larger than the array. The in-place O(1) space version (three reverses) is in the medium section.

</details>

## 12. Find the missing number

An array holds the numbers `1..n` with exactly one missing. Find it.

```js
missingNumber([1, 2, 4, 5, 6]); // 3
```

<details>
<summary>Solution</summary>

```js
function missingNumber(arr) {
  const n = arr.length + 1;
  const expected = (n * (n + 1)) / 2;
  return expected - arr.reduce((a, b) => a + b, 0);
}
```

**Time:** O(n) · **Space:** O(1)

**Follow-up:** for huge `n` the sum can lose precision; XOR-ing all indices and values avoids overflow.

</details>

## 13. Predict the output: coercion and sort

What does each line print?

```js
[1, 2, 3] + [4];
[10, 1, 2].sort();
["1", "2", "3"].map(parseInt);
```

<details>
<summary>Solution</summary>

```js
[1, 2, 3] + [4];               // "1,2,34"
[10, 1, 2].sort();             // [1, 10, 2]
["1", "2", "3"].map(parseInt); // [1, NaN, NaN]
```

- `+` turns both arrays into strings (`"1,2,3"` and `"4"`) and concatenates them.
- `sort()` with no comparator compares elements as **strings**, and `"10" < "2"`. Use `sort((a, b) => a - b)` for numbers.
- `map` passes `(value, index)`, so the calls are `parseInt("1", 0)`, `parseInt("2", 1)`, `parseInt("3", 2)`. Radix 1 is invalid and `"3"` is not a binary digit. Use `.map(Number)`.

**Gotcha:** `sort()` also mutates the original array.

</details>

## 14. Predict the output: length and sparse arrays

```js
const a = [1, 2, 3];
a.length = 1;
console.log(a);

const b = [];
b[5] = "x";
console.log(b.length, b[0], 0 in b);

console.log([, ,].length);
```

<details>
<summary>Solution</summary>

```js
[1]                // setting length smaller deletes elements
6 undefined false  // index 5 makes length 6; indexes 0-4 are holes, not undefined values
2                  // a trailing comma is ignored, so [, ,] has 2 holes
```

**Gotcha:** holes are skipped by `forEach`, `map`, `filter` and `reduce`, but `for...of` and spread treat them as `undefined`.

</details>

## Interview tip

For every easy question, say the brute-force idea in one sentence, give the O(n) version, then mention one edge case (empty array, duplicates, very large input). That shows you think beyond the happy path.
