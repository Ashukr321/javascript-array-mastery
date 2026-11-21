# Frequency Counter

A frequency counter builds a lookup of **value → how many times it appears**, then answers the question from that lookup instead of comparing every pair. Reach for it when a problem says "anagram", "same elements", "duplicates", "most frequent", "first unique", or "count occurrences". It usually turns an O(n²) nested loop into O(n).

## 1. Build a count with a `Map`

```js
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];

const counts = new Map();
for (const f of fruits) {
  counts.set(f, (counts.get(f) ?? 0) + 1);
}
// Map { "apple" => 3, "banana" => 2, "cherry" => 1 }
```

A `Map` keeps insertion order and accepts any key type (numbers stay numbers, objects work too).

## 2. Build a count with a plain object / `reduce`

```js
const countsObj = fruits.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc;
}, {});
// { apple: 3, banana: 2, cherry: 1 }
```

Fine for string keys. Object keys are always strings, so `1` and `"1"` collide.

## 3. Compare two counts (the core trick)

Count one array up, then count the other one **down**. If any count goes below zero, they differ.

```js
function sameFrequency(a, b) {
  if (a.length !== b.length) return false;
  const freq = new Map();
  for (const x of a) freq.set(x, (freq.get(x) ?? 0) + 1);
  for (const x of b) {
    const n = freq.get(x);
    if (!n) return false; // missing or already used up
    freq.set(x, n - 1);
  }
  return true;
}

sameFrequency([1, 2, 2, 3], [2, 3, 1, 2]); // true
sameFrequency([1, 2, 2], [1, 1, 2]);       // false
```

## 4. Read answers from the count

```js
// Most frequent value
const [top] = [...counts].sort((x, y) => y[1] - x[1]);
// ["apple", 3]

// Values that appear more than once
const dupes = [...counts].filter(([, n]) => n > 1).map(([v]) => v);
// ["apple", "banana"]
```

## 5. Fixed alphabet: an array of 26 counters

For lowercase letters only, an `Array(26)` is faster than a `Map`:

```js
const letterCounts = (s) => {
  const c = new Array(26).fill(0);
  for (const ch of s) c[ch.charCodeAt(0) - 97]++;
  return c;
};
```

## Complexity

| Approach | Time | Space |
|---|---|---|
| Nested loops (compare every pair) | O(n²) | O(1) |
| Sort both, then compare | O(n log n) | O(n) (or O(1) in place) |
| Frequency counter (`Map`) | O(n) | O(k) distinct values |

## Gotchas

- `counts.get(x) ?? 0` not `counts.get(x) || 0` matters only if you ever store falsy counts on purpose; both work for normal counting.
- Plain objects turn keys into strings and inherit keys like `constructor`. Use `Map` or `Object.create(null)` for user data.
- Check lengths first when comparing two collections: it is a free early exit.
- `Object.groupBy` groups items into arrays; it does not count. Use `.length` on each group if you go that route.

## Interview tip

Say the brute force first ("for each item, scan the other array: O(n²)"), then say "I can trade O(n) space for O(n) time with a frequency map". Then write the count-up / count-down version from section 3.

## Practice questions

### 1. Valid anagram

Return `true` if `t` is an anagram of `s`.

`isAnagram("listen", "silent")` → `true`, `isAnagram("rat", "car")` → `false`

Brute force: sort both strings, O(n log n). Pattern: O(n).

<details><summary>Solution</summary>

```js
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  for (const ch of t) {
    const n = freq.get(ch);
    if (!n) return false;
    freq.set(ch, n - 1);
  }
  return true;
}
```

</details>

### 2. First unique character

Return the index of the first character that appears exactly once, or `-1`.

`firstUniqChar("leetcode")` → `0`, `firstUniqChar("aabb")` → `-1`

Brute force: for each char, scan the whole string, O(n²). Pattern: two passes, O(n).

<details><summary>Solution</summary>

```js
function firstUniqChar(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}
```

</details>

### 3. Contains duplicate

Return `true` if any value appears at least twice.

`containsDuplicate([1, 2, 3, 1])` → `true`, `containsDuplicate([1, 2, 3])` → `false`

Brute force: compare every pair, O(n²). Pattern: a `Set` is a frequency counter that only cares about "seen before", O(n).

<details><summary>Solution</summary>

```js
function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}
// one-liner: new Set(nums).size !== nums.length
```

</details>

### 4. Top K frequent elements

Return the `k` most frequent values.

`topKFrequent([1, 1, 1, 2, 2, 3], 2)` → `[1, 2]`

Brute force: count each value with a full scan, O(n²). Pattern: count in O(n), then bucket by frequency for O(n) total (sorting the entries is O(n log n) and also accepted).

<details><summary>Solution</summary>

```js
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  // bucket[i] holds the values that appear exactly i times
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, c] of freq) buckets[c].push(n);
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}
```

</details>

### 5. Group anagrams

Group words that are anagrams of each other.

`groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])` → `[["eat","tea","ate"], ["tan","nat"], ["bat"]]`

Brute force: compare every pair with `isAnagram`, O(n² · m). Pattern: use a letter-count signature as the map key, O(n · m).

<details><summary>Solution</summary>

```js
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const c = new Array(26).fill(0);
    for (const ch of w) c[ch.charCodeAt(0) - 97]++;
    const key = c.join("#");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
```

</details>
