# Medium Interview Questions

These questions show up in most mid-level JavaScript interviews. Most of them have an obvious O(n²) answer and a better O(n) or O(n log n) answer that uses a `Map`, a `Set`, two pointers or a running total. Say the slow idea first, then improve it.

All solutions are in `practice.js`, with checks that prove they work. Run it with `node practice.js`.

## 1. Two sum

Return the indexes of the two numbers that add up to `target`.

```js
twoSum([2, 7, 11, 15], 9); // [0, 1]
```

<details>
<summary>Solution</summary>

```js
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
```

**Time:** O(n) · **Space:** O(n)

**Gotcha:** check the map **before** adding the current number, otherwise `[3]` with target `6` would pair 3 with itself.

</details>

## 2. Group by

Group items by the result of a key function.

```js
groupBy([1.2, 1.8, 2.1, 3.5], Math.floor); // { 1: [1.2, 1.8], 2: [2.1], 3: [3.5] }
```

<details>
<summary>Solution</summary>

```js
function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] ||= []).push(item);
    return groups;
  }, {});
}
```

**Time:** O(n) · **Space:** O(n)

**Follow-up:** modern runtimes have `Object.groupBy(arr, keyFn)` and `Map.groupBy` built in. Use a `Map` when keys are not strings.

</details>

## 3. Deep flatten (recursive and iterative)

Flatten an array nested to any depth, without `.flat()`.

```js
flattenDeep([1, [2, [3, [4, [5]]]], 6]); // [1, 2, 3, 4, 5, 6]
```

<details>
<summary>Solution</summary>

```js
// Recursive
function flattenDeep(arr) {
  const out = [];
  for (const x of arr) {
    if (Array.isArray(x)) out.push(...flattenDeep(x));
    else out.push(x);
  }
  return out;
}

// Iterative with a stack (no recursion limit)
function flattenDeepIterative(arr) {
  const stack = [...arr];
  const out = [];
  while (stack.length) {
    const x = stack.pop();
    if (Array.isArray(x)) stack.push(...x);
    else out.push(x);
  }
  return out.reverse(); // pop() reads from the end, so reverse once at the finish
}
```

**Time:** O(n) total elements · **Space:** O(n)

**Follow-up:** very deep nesting can overflow the call stack in the recursive version; the iterative one avoids that. The built-in answer is `arr.flat(Infinity)`.

</details>

## 4. Polyfill `map`, `filter` and `reduce`

Write your own versions of the three core methods.

```js
[1, 2, 3].myMap((x) => x * 2); // [2, 4, 6]
[1, 2, 3, 4].myFilter((x) => x % 2 === 0); // [2, 4]
[1, 2, 3].myReduce((a, b) => a + b); // 6
```

<details>
<summary>Solution</summary>

```js
Array.prototype.myMap = function (cb, thisArg) {
  const out = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) out[i] = cb.call(thisArg, this[i], i, this);
  }
  return out;
};

Array.prototype.myFilter = function (cb, thisArg) {
  const out = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && cb.call(thisArg, this[i], i, this)) out.push(this[i]);
  }
  return out;
};

Array.prototype.myReduce = function (cb, ...init) {
  let i = 0;
  let acc;
  if (init.length) {
    acc = init[0];
  } else {
    while (i < this.length && !(i in this)) i++; // skip leading holes
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) {
    if (i in this) acc = cb(acc, this[i], i, this);
  }
  return acc;
};
```

**Time:** O(n) each · **Space:** O(n) for map/filter, O(1) for reduce

**Gotcha:** use a regular `function`, not an arrow, so `this` is the array. Use `...init` (or `arguments.length`) to tell "no initial value" apart from an initial value of `undefined`. The hard section has a fuller `reduce` polyfill.

</details>

## 5. Move zeros to the end

Move every `0` to the end **in place**, keeping the order of the other elements.

```js
moveZeros([0, 1, 0, 3, 12]); // [1, 3, 12, 0, 0]
```

<details>
<summary>Solution</summary>

```js
function moveZeros(nums) {
  let write = 0;
  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      [nums[write], nums[read]] = [nums[read], nums[write]];
      write++;
    }
  }
  return nums;
}
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** `nums.sort((a, b) => (a === 0) - (b === 0))` also works because sort is stable, but it is O(n log n).

</details>

## 6. Intersection of two arrays

Return the unique values that appear in both arrays.

```js
intersection([1, 2, 2, 3, 4], [2, 2, 4, 5]); // [2, 4]
```

<details>
<summary>Solution</summary>

```js
function intersection(a, b) {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}
```

**Time:** O(n + m) · **Space:** O(n + m)

**Follow-up:** "Keep duplicates" (`[2, 2, 4]`) - count `b` in a `Map` and decrement the count as you match items from `a`.

</details>

## 7. Maximum subarray sum (Kadane's algorithm)

Find the largest sum of any contiguous subarray.

```js
maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]); // 6  ([4, -1, 2, 1])
```

<details>
<summary>Solution</summary>

```js
function maxSubarray(nums) {
  let best = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // extend the run or start fresh
    best = Math.max(best, current);
  }
  return best;
}
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** start from `nums[0]`, not `0`, or an all-negative array like `[-3, -1, -2]` returns `0` instead of `-1`.

</details>

## 8. Product of array except self

Return an array where each item is the product of every other item. No division.

```js
productExceptSelf([1, 2, 3, 4]); // [24, 12, 8, 6]
```

<details>
<summary>Solution</summary>

```js
function productExceptSelf(nums) {
  const out = new Array(nums.length).fill(1);
  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    out[i] = left; // product of everything to the left
    left *= nums[i];
  }
  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    out[i] *= right; // times product of everything to the right
    right *= nums[i];
  }
  return out;
}
```

**Time:** O(n) · **Space:** O(1) extra (the output array does not count)

**Gotcha:** the "total product / nums[i]" trick breaks as soon as the array contains a `0`, which is why interviewers ban division.

</details>

## 9. Group anagrams

```js
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]
```

<details>
<summary>Solution</summary>

```js
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = [...w].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
```

**Time:** O(n · k log k) for n words of length k · **Space:** O(n · k)

**Follow-up:** for lowercase letters only, a 26-slot letter count joined into a string is an O(k) key instead of sorting.

</details>

## 10. Longest consecutive sequence

Return the length of the longest run of consecutive integers, in O(n).

```js
longestConsecutive([100, 4, 200, 1, 3, 2]); // 4  (1, 2, 3, 4)
```

<details>
<summary>Solution</summary>

```js
function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const n of set) {
    if (set.has(n - 1)) continue; // only start counting at the beginning of a run
    let len = 1;
    while (set.has(n + len)) len++;
    best = Math.max(best, len);
  }
  return best;
}
```

**Time:** O(n) · **Space:** O(n)

**Gotcha:** without the `n - 1` check, every number walks its whole run and the loop becomes O(n²). Sorting first is simpler but O(n log n).

</details>

## 11. Merge overlapping intervals

```js
mergeIntervals([[8, 10], [1, 3], [2, 6], [15, 18]]); // [[1, 6], [8, 10], [15, 18]]
```

<details>
<summary>Solution</summary>

```js
function mergeIntervals(intervals) {
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const out = [];
  for (const [start, end] of sorted) {
    const last = out[out.length - 1];
    if (last && start <= last[1]) last[1] = Math.max(last[1], end);
    else out.push([start, end]);
  }
  return out;
}
```

**Time:** O(n log n) · **Space:** O(n)

**Gotcha:** use `Math.max` for the new end - `[1, 10]` and `[2, 3]` must stay `[1, 10]`. Ask whether touching intervals like `[1, 4]` and `[4, 5]` count as overlapping.

</details>

## 12. Rotate an array in place

Rotate right by `k` steps using O(1) extra space.

```js
rotateInPlace([1, 2, 3, 4, 5, 6, 7], 3); // [5, 6, 7, 1, 2, 3, 4]
```

<details>
<summary>Solution</summary>

```js
function rotateInPlace(nums, k) {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n;
  const reverse = (i, j) => {
    for (; i < j; i++, j--) [nums[i], nums[j]] = [nums[j], nums[i]];
  };
  reverse(0, n - 1); // [7, 6, 5, 4, 3, 2, 1]
  reverse(0, k - 1); // [5, 6, 7, 4, 3, 2, 1]
  reverse(k, n - 1); // [5, 6, 7, 1, 2, 3, 4]
  return nums;
}
```

**Time:** O(n) · **Space:** O(1)

**Gotcha:** `k %= n` first. Calling `nums.unshift(nums.pop())` k times also works in place but is O(n · k).

</details>

## 13. Predict the output: holes, NaN and delete

```js
Array(3).map(() => 0);
Array.from({ length: 3 }, () => 0);
[NaN].indexOf(NaN);
[NaN].includes(NaN);

const d = [1, 2, 3];
delete d[1];
console.log(d.length, 1 in d);
```

<details>
<summary>Solution</summary>

```js
Array(3).map(() => 0);              // [ <3 empty items> ]  - map skips holes
Array.from({ length: 3 }, () => 0); // [0, 0, 0]
[NaN].indexOf(NaN);                 // -1    - indexOf uses ===, and NaN !== NaN
[NaN].includes(NaN);                // true  - includes uses SameValueZero
3 false                             // delete leaves a hole; length does not change
```

**Gotcha:** to remove an element and shift the rest, use `splice(i, 1)`, never `delete`. To create a filled array, use `Array.from` or `Array(n).fill(x)`.

</details>

## 14. Predict the output: comparisons and copies

```js
[] == [];
typeof [];

const orig = [{ n: 1 }];
const copy = [...orig];
copy[0].n = 99;
console.log(orig[0].n);

const x = [2, 1];
console.log(x.sort() === x);
```

<details>
<summary>Solution</summary>

```js
false     // two different array objects; == compares references
"object"  // use Array.isArray([]) to check for arrays
99        // spread copies only the outer array; the objects inside are shared
true      // sort mutates and returns the same array
```

**Follow-up:** for a deep copy use `structuredClone(orig)`. For a sorted copy without mutating, use `toSorted()` or `[...x].sort()`.

</details>

## Interview tip

Most medium array questions fall into a few patterns: **hash map** (two sum, anagrams, consecutive sequence), **two pointers** (move zeros, rotate), **running value** (Kadane, product except self) and **sort first** (merge intervals). Name the pattern out loud before you code; it tells the interviewer you know why the solution works.
