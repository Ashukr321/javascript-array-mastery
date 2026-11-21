# Hard Interview Questions

These questions are asked in senior and product-company rounds. Each one has a known technique behind it: two pointers, a monotonic deque, binary search on the answer, prefix sums, in-place index tricks or divide and conquer. If you know the technique, the code is short. If you do not, start with brute force and say out loud where the time goes.

All solutions are in `practice.js`, with checks that prove they work. Run it with `node practice.js`.

## 1. Trapping rain water

Each number is the height of a bar of width 1. How much water is trapped after it rains?

```js
trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]); // 6
```

<details>
<summary>Solution</summary>

```js
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left]);
      water += leftMax - height[left];
      left++;
    } else {
      rightMax = Math.max(rightMax, height[right]);
      water += rightMax - height[right];
      right--;
    }
  }
  return water;
}
```

**Time:** O(n) · **Space:** O(1)

**Why it works:** water above a bar is `min(maxLeft, maxRight) - height`. Moving the lower side is safe because the other side is already known to be taller. The easier O(n) space version precomputes `leftMax[]` and `rightMax[]` arrays.

</details>

## 2. Sliding window maximum

Return the maximum of every window of size `k`.

```js
maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3); // [3, 3, 5, 5, 6, 7]
```

<details>
<summary>Solution</summary>

```js
function maxSlidingWindow(nums, k) {
  const deque = []; // indexes, values decreasing from head to tail
  let head = 0;     // moving head instead of shift() keeps it O(n)
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    if (head < deque.length && deque[head] <= i - k) head++; // drop index that left the window
    while (deque.length > head && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) out.push(nums[deque[head]]);
  }
  return out;
}
```

**Time:** O(n) · **Space:** O(k)

**Gotcha:** `Array.prototype.shift()` is O(n) in the worst case, so a deque built on `shift()` can quietly turn into O(n · k). Keep a head index instead.

</details>

## 3. Median of two sorted arrays

Find the median of two sorted arrays in O(log(min(m, n))).

```js
findMedianSortedArrays([1, 3], [2]);    // 2
findMedianSortedArrays([1, 2], [3, 4]); // 2.5
```

<details>
<summary>Solution</summary>

```js
function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a]; // binary search the shorter array
  const m = a.length;
  const n = b.length;
  const half = Math.floor((m + n + 1) / 2);
  let lo = 0;
  let hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2); // elements taken from a
    const j = half - i;                  // elements taken from b
    const aLeft = i === 0 ? -Infinity : a[i - 1];
    const aRight = i === m ? Infinity : a[i];
    const bLeft = j === 0 ? -Infinity : b[j - 1];
    const bRight = j === n ? Infinity : b[j];
    if (aLeft <= bRight && bLeft <= aRight) {
      const leftMax = Math.max(aLeft, bLeft);
      if ((m + n) % 2) return leftMax;
      return (leftMax + Math.min(aRight, bRight)) / 2;
    }
    if (aLeft > bRight) hi = i - 1;
    else lo = i + 1;
  }
  throw new Error("Inputs must be sorted");
}
```

**Time:** O(log(min(m, n))) · **Space:** O(1)

**Follow-up:** the merge-then-pick answer is O(m + n) and is fine to mention first. The `-Infinity` / `Infinity` sentinels are what handle an empty side cleanly.

</details>

## 4. Longest increasing subsequence in O(n log n)

Return the length of the longest strictly increasing subsequence.

```js
lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]); // 4  ([2, 3, 7, 18])
```

<details>
<summary>Solution</summary>

```js
function lengthOfLIS(nums) {
  const tails = []; // tails[len - 1] = smallest tail of an increasing subsequence of that length
  for (const x of nums) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x; // extend, or replace with a smaller tail
  }
  return tails.length;
}
```

**Time:** O(n log n) · **Space:** O(n)

**Gotcha:** `tails` is **not** the subsequence itself, only its length is right. To rebuild the actual sequence you need to store a parent index per element. For non-strict (`<=`) increase, use `tails[mid] <= x`.

</details>

## 5. Count subarrays with sum k

Count contiguous subarrays whose sum equals `k`. Numbers can be negative.

```js
subarraySum([1, 1, 1], 2);  // 2
subarraySum([1, -1, 0], 0); // 3
```

<details>
<summary>Solution</summary>

```js
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // prefix sum -> how many times seen
  let prefix = 0;
  let count = 0;
  for (const n of nums) {
    prefix += n;
    count += seen.get(prefix - k) || 0; // a subarray ending here sums to k
    seen.set(prefix, (seen.get(prefix) || 0) + 1);
  }
  return count;
}
```

**Time:** O(n) · **Space:** O(n)

**Gotcha:** seed the map with `[0, 1]` so subarrays that start at index 0 are counted. A sliding window does **not** work here because negative numbers break the "grow / shrink" logic.

</details>

## 6. Minimum size subarray sum

All numbers are positive. Return the length of the shortest subarray with sum `>= target`, or `0`.

```js
minSubArrayLen(7, [2, 3, 1, 2, 4, 3]); // 2  ([4, 3])
```

<details>
<summary>Solution</summary>

```js
function minSubArrayLen(target, nums) {
  let left = 0;
  let total = 0;
  let best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    total += nums[right];
    while (total >= target) {
      best = Math.min(best, right - left + 1);
      total -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
```

**Time:** O(n) · **Space:** O(1)

**Follow-up:** this only works because everything is positive. With negatives, use prefix sums plus a monotonic deque.

</details>

## 7. First missing positive

Find the smallest missing positive integer in O(n) time and O(1) extra space.

```js
firstMissingPositive([3, 4, -1, 1]); // 2
firstMissingPositive([1, 2, 3]);     // 4
```

<details>
<summary>Solution</summary>

```js
function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    // put value v at index v - 1
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const j = nums[i] - 1;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  }
  for (let i = 0; i < n; i++) if (nums[i] !== i + 1) return i + 1;
  return n + 1;
}
```

**Time:** O(n) - each swap puts one value in its final place · **Space:** O(1)

**Gotcha:** the `nums[nums[i] - 1] !== nums[i]` check stops an infinite loop on duplicates like `[1, 1]`. Note this mutates the input; a `Set` answer is simpler but O(n) space.

</details>

## 8. 3Sum

Return all unique triplets that sum to `0`.

```js
threeSum([-1, 0, 1, 2, -1, -4]); // [[-1, -1, 2], [-1, 0, 1]]
```

<details>
<summary>Solution</summary>

```js
function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (a[i] > 0) break;
    if (i > 0 && a[i] === a[i - 1]) continue; // skip duplicate first numbers
    let lo = i + 1;
    let hi = a.length - 1;
    while (lo < hi) {
      const s = a[i] + a[lo] + a[hi];
      if (s < 0) lo++;
      else if (s > 0) hi--;
      else {
        out.push([a[i], a[lo], a[hi]]);
        while (lo < hi && a[lo] === a[lo + 1]) lo++;
        while (lo < hi && a[hi] === a[hi - 1]) hi--;
        lo++;
        hi--;
      }
    }
  }
  return out;
}
```

**Time:** O(n²) · **Space:** O(1) besides the sorted copy

**Gotcha:** sort with `(x, y) => x - y`. The default string sort puts `-4` after `-1` and silently breaks the two-pointer logic.

</details>

## 9. Implement `Array.prototype.flat` with depth

```js
flat([1, [2, [3, [4]]], , 5]);           // [1, 2, [3, [4]], 5]
flat([1, [2, [3, [4]]], , 5], Infinity); // [1, 2, 3, 4, 5]
```

<details>
<summary>Solution</summary>

```js
function flat(arr, depth = 1) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    if (!(i in arr)) continue; // flat() removes holes
    const x = arr[i];
    if (Array.isArray(x) && depth >= 1) out.push(...flat(x, depth - 1));
    else out.push(x);
  }
  return out;
}
```

**Time:** O(n) total elements · **Space:** O(n) plus O(depth) call stack

**Gotcha:** `Infinity - 1` is still `Infinity`, so infinite depth works with no special case. Real `flat()` removes holes, which is easy to forget.

</details>

## 10. Implement a stable sort

Write a sort that keeps equal items in their original order and accepts a comparator.

```js
const people = [
  { name: "A", age: 30 },
  { name: "B", age: 25 },
  { name: "C", age: 30 },
  { name: "D", age: 25 },
];
mergeSort(people, (x, y) => x.age - y.age).map((p) => p.name); // ["B", "D", "A", "C"]
```

<details>
<summary>Solution</summary>

```js
function mergeSort(arr, cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0)) {
  if (arr.length <= 1) return arr.slice();
  const mid = arr.length >> 1;
  const left = mergeSort(arr.slice(0, mid), cmp);
  const right = mergeSort(arr.slice(mid), cmp);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    out.push(cmp(left[i], right[j]) <= 0 ? left[i++] : right[j++]); // <= keeps equal items in order
  }
  return out.concat(left.slice(i), right.slice(j));
}
```

**Time:** O(n log n) · **Space:** O(n)

**Gotcha:** using `< 0` instead of `<= 0` takes from the right half on ties and breaks stability. `Array.prototype.sort` has been required to be stable since ES2019.

</details>

## 11. Implement `reduce` with every edge case

Write a `reduce` that behaves like the spec: holes, array-likes, missing or explicit `undefined` initial value, and the right errors.

```js
reduce([, 2, , 3], (a, b) => a + b);                     // 5
reduce({ length: 2, 0: "a", 1: "b" }, (a, b) => a + b);  // "ab"
reduce([], (a, b) => a + b);                             // TypeError
```

<details>
<summary>Solution</summary>

```js
function reduce(arrayLike, callback, initialValue) {
  if (arrayLike == null) throw new TypeError("reduce called on null or undefined");
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const o = Object(arrayLike);
  const len = o.length >>> 0; // spec ToLength-style conversion
  let i = 0;
  let acc;
  if (arguments.length >= 3) {
    acc = initialValue; // even if it is undefined
  } else {
    while (i < len && !(i in o)) i++; // skip leading holes
    if (i >= len) throw new TypeError("Reduce of empty array with no initial value");
    acc = o[i++];
  }
  for (; i < len; i++) {
    if (i in o) acc = callback(acc, o[i], i, o);
  }
  return acc;
}
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** `initialValue === undefined` is the wrong check - `reduce(arr, fn, undefined)` must use `undefined` as the start. Use `arguments.length` (or a rest parameter). Also, `len` is read **once** up front, so items pushed during the loop are ignored, just like the real method.

</details>

## 12. Merge k sorted arrays

```js
mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]); // [1, 1, 2, 3, 4, 4, 5, 6]
```

<details>
<summary>Solution</summary>

```js
function mergeTwo(a, b) {
  const out = [];
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}

function mergeKSorted(arrays) {
  if (arrays.length === 0) return [];
  let list = arrays;
  while (list.length > 1) {
    const next = [];
    for (let i = 0; i < list.length; i += 2) {
      next.push(i + 1 < list.length ? mergeTwo(list[i], list[i + 1]) : list[i]);
    }
    list = next;
  }
  return list[0];
}
```

**Time:** O(N log k) for N total elements · **Space:** O(N)

**Follow-up:** the other classic answer is a min-heap of size k holding the head of each array, also O(N log k). JavaScript has no built-in heap, so pairwise merging is usually quicker to write in an interview. Merging one by one into a growing result is O(N · k).

</details>

## 13. Kth largest element (quickselect)

Find the kth largest element in average O(n), without fully sorting.

```js
findKthLargest([3, 2, 1, 5, 6, 4], 2); // 5
```

<details>
<summary>Solution</summary>

```js
function findKthLargest(nums, k) {
  const a = [...nums];
  const target = a.length - k; // index in ascending order
  let lo = 0;
  let hi = a.length - 1;
  while (true) {
    const p = lo + Math.floor(Math.random() * (hi - lo + 1)); // random pivot
    [a[p], a[hi]] = [a[hi], a[p]];
    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (a[i] < a[hi]) {
        [a[i], a[store]] = [a[store], a[i]];
        store++;
      }
    }
    [a[store], a[hi]] = [a[hi], a[store]]; // pivot lands in its final position
    if (store === target) return a[store];
    if (store < target) lo = store + 1;
    else hi = store - 1;
  }
}
```

**Time:** O(n) average, O(n²) worst case · **Space:** O(n) for the copy (O(1) if you may mutate)

**Follow-up:** a random pivot makes the worst case very unlikely. A min-heap of size k gives a guaranteed O(n log k). Sorting is O(n log n) and is the baseline to mention first.

</details>

## 14. Count inversions

Count pairs `i < j` where `arr[i] > arr[j]`.

```js
countInversions([2, 4, 1, 3, 5]); // 3  ((2,1), (4,1), (4,3))
```

<details>
<summary>Solution</summary>

```js
function countInversions(arr) {
  const sortCount = (a) => {
    if (a.length <= 1) return [a, 0];
    const mid = a.length >> 1;
    const [left, x] = sortCount(a.slice(0, mid));
    const [right, y] = sortCount(a.slice(mid));
    const out = [];
    let count = x + y;
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) out.push(left[i++]);
      else {
        count += left.length - i; // every remaining left item is bigger than right[j]
        out.push(right[j++]);
      }
    }
    return [out.concat(left.slice(i), right.slice(j)), count];
  };
  return sortCount(arr)[1];
}
```

**Time:** O(n log n) · **Space:** O(n)

**Gotcha:** use `<=` when comparing so equal values are **not** counted as inversions. The brute-force double loop is O(n²); a Fenwick tree is the other O(n log n) answer.

</details>

## Interview tip

At this level the interviewer wants to hear the technique name and the invariant: "the deque holds indexes in decreasing value order", "`tails[i]` is the smallest tail for length i + 1", "the map counts prefix sums seen so far". State the invariant, then the code mostly writes itself.
