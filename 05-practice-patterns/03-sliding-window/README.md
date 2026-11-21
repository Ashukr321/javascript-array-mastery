# Sliding Window

A sliding window keeps a contiguous slice `[left, right]` of an array or string and moves it forward, updating a running result instead of recomputing the whole slice. Use it when a problem says "contiguous subarray / substring" plus "of size k", "longest", "shortest", or "at most k distinct". It turns O(n · k) or O(n²) into O(n).

## 1. Fixed-size window

Add the element entering on the right, remove the one leaving on the left.

```js
function maxSumOfK(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  let best = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k]; // slide by one
    best = Math.max(best, windowSum);
  }
  return best;
}

maxSumOfK([2, 1, 5, 1, 3, 2], 3); // 9  (5 + 1 + 3)
```

## 2. Variable-size window: grow, then shrink

Expand `right` every step. While the window breaks the rule, move `left` forward.

```js
// Shortest subarray with sum >= target (positive numbers)
function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
}

minSubArrayLen(7, [2, 3, 1, 2, 4, 3]); // 2  ([4, 3])
```

## 3. Window + frequency map

Track what is inside the window with a `Map` (or `Set`) when the rule is about distinct values.

```js
// Longest substring without repeating characters
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) left = lastSeen.get(ch) + 1;
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

lengthOfLongestSubstring("abcabcbb"); // 3  ("abc")
```

## 4. Moving average (real-world)

```js
const prices = [10, 12, 11, 15, 14];
const k = 3;
let s = 0;
const movingAvg = [];
prices.forEach((p, i) => {
  s += p;
  if (i >= k) s -= prices[i - k];
  if (i >= k - 1) movingAvg.push(s / k);
});
// [11, 12.67, 13.33]
```

## Complexity

| Problem | Brute force | Sliding window |
|---|---|---|
| Max sum of size k | O(n · k) | O(n) |
| Shortest subarray with sum ≥ target | O(n²) | O(n) |
| Longest substring without repeats | O(n²) – O(n³) | O(n) |
| Space | O(1) | O(1) or O(k) for the map |

Each element enters the window once and leaves once, which is why the nested `while` is still O(n) overall.

## Gotchas

- The "shrink while sum is too big" trick needs **non-negative** numbers. With negatives, use prefix sum + hash map instead.
- Window length is `right - left + 1`, not `right - left`.
- Handle `k > nums.length` and empty input before the first loop.
- With a frequency map, delete keys whose count drops to 0 if you rely on `map.size` for "number of distinct values".

## Interview tip

Name the window explicitly: "I'll keep `left` and `right`, expand right every step, and shrink left while the window is invalid". Then say why it is O(n): every index is visited by each pointer at most once.

## Practice questions

### 1. Maximum average subarray of size k

Return the maximum average of any contiguous subarray of length `k`.

`findMaxAverage([1, 12, -5, -6, 50, 3], 4)` → `12.75`

Brute force: sum every window from scratch, O(n · k). Pattern: fixed window, O(n).

<details><summary>Solution</summary>

```js
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let best = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    best = Math.max(best, sum);
  }
  return best / k;
}
```

</details>

### 2. Longest substring without repeating characters

`lengthOfLongestSubstring("pwwkew")` → `3` (`"wke"`), `lengthOfLongestSubstring("bbbbb")` → `1`

Brute force: check every substring for duplicates, O(n²) with a set. Pattern: variable window + last-seen map, O(n).

<details><summary>Solution</summary>

```js
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) left = lastSeen.get(ch) + 1;
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

</details>

### 3. Minimum size subarray sum

Return the length of the shortest contiguous subarray with sum `>= target`, or `0`.

`minSubArrayLen(7, [2, 3, 1, 2, 4, 3])` → `2`, `minSubArrayLen(11, [1, 1, 1])` → `0`

Brute force: every start/end pair, O(n²). Pattern: grow/shrink window, O(n).

<details><summary>Solution</summary>

```js
function minSubArrayLen(target, nums) {
  let left = 0, sum = 0, best = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left++];
    }
  }
  return best === Infinity ? 0 : best;
}
```

</details>

### 4. Max consecutive ones with k flips

Return the longest run of `1`s if you may flip at most `k` zeros.

`longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)` → `6`

Brute force: try every subarray and count zeros, O(n²). Pattern: window that holds at most `k` zeros, O(n).

<details><summary>Solution</summary>

```js
function longestOnes(nums, k) {
  let left = 0, zeros = 0, best = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}
```

</details>

### 5. Find all anagrams in a string

Return every start index in `s` where a permutation of `p` begins.

`findAnagrams("cbaebabacd", "abc")` → `[0, 6]`

Brute force: sort or count every window of length `p.length`, O(n · m). Pattern: fixed window with 26 letter counts, O(n · 26) = O(n).

<details><summary>Solution</summary>

```js
function findAnagrams(s, p) {
  const result = [];
  if (p.length > s.length) return result;
  const need = new Array(26).fill(0);
  const have = new Array(26).fill(0);
  const idx = (ch) => ch.charCodeAt(0) - 97;
  for (const ch of p) need[idx(ch)]++;
  for (let i = 0; i < s.length; i++) {
    have[idx(s[i])]++;
    if (i >= p.length) have[idx(s[i - p.length])]--;
    if (i >= p.length - 1 && have.every((c, j) => c === need[j])) result.push(i - p.length + 1);
  }
  return result;
}
```

</details>
