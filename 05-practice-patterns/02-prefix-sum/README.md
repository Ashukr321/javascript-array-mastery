# Prefix Sum

A prefix sum array stores the running total up to each index, so the sum of **any** range becomes one subtraction. Use it when you are asked for many range sums on the same data, "subarray sum equals k", "running balance", or "equilibrium / pivot index". You pay O(n) once, then every range query is O(1).

## 1. Build the prefix array

Use a leading `0` so `prefix[i]` is the sum of the first `i` items. This removes every `i - 1` edge case.

```js
const nums = [3, 1, 4, 1, 5, 9];

const prefix = [0];
for (const n of nums) prefix.push(prefix.at(-1) + n);
// [0, 3, 4, 8, 9, 14, 23]
```

## 2. Range sum in O(1)

Sum of `nums[l..r]` (inclusive) is `prefix[r + 1] - prefix[l]`.

```js
const rangeSum = (l, r) => prefix[r + 1] - prefix[l];

rangeSum(1, 3); // 1 + 4 + 1 = 6
rangeSum(0, 5); // 23
```

## 3. Running totals with `map` / `reduce`

For display (running balance, cumulative chart) you often only need the running totals:

```js
const deposits = [100, -20, 50, -30];
let total = 0;
const balance = deposits.map((d) => (total += d));
// [100, 80, 130, 100]
```

## 4. Prefix sum + hash map: "subarray sums to k"

If `prefix[j] - prefix[i] === k`, the subarray between them sums to `k`. So while walking, ask "how many earlier prefixes equal `current - k`?"

```js
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // empty prefix
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    count += seen.get(sum - k) ?? 0;
    seen.set(sum, (seen.get(sum) ?? 0) + 1);
  }
  return count;
}

subarraySum([1, 1, 1], 2); // 2
```

This works with negative numbers, which the sliding window cannot handle.

## 5. 2D prefix sum (grids)

```js
const grid = [
  [1, 2],
  [3, 4],
];
const P = Array.from({ length: 3 }, () => new Array(3).fill(0));
for (let r = 0; r < 2; r++)
  for (let c = 0; c < 2; c++)
    P[r + 1][c + 1] = grid[r][c] + P[r][c + 1] + P[r + 1][c] - P[r][c];
// sum of rectangle (r1,c1)..(r2,c2) = P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]
```

## Complexity

| Approach | Build | Per range query | q queries |
|---|---|---|---|
| Loop over the range each time | none | O(n) | O(n · q) |
| Prefix sum array | O(n) | O(1) | O(n + q) |
| Subarray sum = k, brute force | | | O(n²) |
| Subarray sum = k, prefix + Map | | | O(n) time, O(n) space |

## Gotchas

- Off-by-one: with the leading `0`, the array is `n + 1` long and the range formula is `prefix[r + 1] - prefix[l]`.
- Seed the map with `[0, 1]` in the subarray-sum trick, or you miss subarrays that start at index 0.
- The prefix array goes stale if the original array changes. For frequent updates use a Fenwick (binary indexed) tree.
- Large sums can exceed `Number.MAX_SAFE_INTEGER`; use `BigInt` if values are huge.

## Interview tip

When you hear "sum of a subarray" with **negative numbers allowed**, think prefix sum + hash map, not sliding window. Say the brute force (all pairs i, j: O(n²)) and explain the `current - k` lookup.

## Practice questions

### 1. Range sum query

Given `nums`, answer many `sumRange(l, r)` queries.

`nums = [-2, 0, 3, -5, 2, -1]`: `sumRange(0, 2)` → `1`, `sumRange(2, 5)` → `-1`, `sumRange(0, 5)` → `-3`

Brute force: O(n) per query. Pattern: O(n) build, O(1) per query.

<details><summary>Solution</summary>

```js
function makeRangeSum(nums) {
  const prefix = [0];
  for (const n of nums) prefix.push(prefix.at(-1) + n);
  return (l, r) => prefix[r + 1] - prefix[l];
}
```

</details>

### 2. Pivot index

Return the leftmost index where the sum of items to the left equals the sum to the right, or `-1`.

`pivotIndex([1, 7, 3, 6, 5, 6])` → `3` (1+7+3 = 11 = 5+6)

Brute force: sum both sides for every index, O(n²). Pattern: total minus running left sum, O(n).

<details><summary>Solution</summary>

```js
function pivotIndex(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let left = 0;
  for (let i = 0; i < nums.length; i++) {
    if (left === total - left - nums[i]) return i;
    left += nums[i];
  }
  return -1;
}
```

</details>

### 3. Subarray sum equals K

Count contiguous subarrays whose sum is `k`.

`subarraySum([1, 2, 3], 3)` → `2` (`[1,2]` and `[3]`)

Brute force: try every start and end, O(n²). Pattern: prefix + Map, O(n).

<details><summary>Solution</summary>

```js
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]);
  let sum = 0, count = 0;
  for (const n of nums) {
    sum += n;
    count += seen.get(sum - k) ?? 0;
    seen.set(sum, (seen.get(sum) ?? 0) + 1);
  }
  return count;
}
```

</details>

### 4. Product of array except self

Return an array where `out[i]` is the product of every element except `nums[i]`, without division.

`productExceptSelf([1, 2, 3, 4])` → `[24, 12, 8, 6]`

Brute force: multiply everything else for each index, O(n²). Pattern: prefix products from the left times suffix products from the right, O(n).

<details><summary>Solution</summary>

```js
function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    out[i] = left;
    left *= nums[i];
  }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= right;
    right *= nums[i];
  }
  return out;
}
```

</details>

### 5. Running sum

Return the running sum: `out[i] = nums[0] + ... + nums[i]`.

`runningSum([1, 2, 3, 4])` → `[1, 3, 6, 10]`

Brute force: re-sum from 0 for each index, O(n²). Pattern: carry the total, O(n).

<details><summary>Solution</summary>

```js
function runningSum(nums) {
  let total = 0;
  return nums.map((n) => (total += n));
}
```

</details>
