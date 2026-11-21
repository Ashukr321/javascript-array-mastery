// Practice: frequency counter
// Run: node practice.js

// 1. Count with a Map
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const counts = new Map();
for (const f of fruits) counts.set(f, (counts.get(f) ?? 0) + 1);
console.log("Map counts:", counts);

// 2. Count with reduce into an object
const countsObj = fruits.reduce((acc, f) => {
  acc[f] = (acc[f] || 0) + 1;
  return acc;
}, {});
console.log("Object counts:", countsObj);

// 3. Compare two counts
function sameFrequency(a, b) {
  if (a.length !== b.length) return false;
  const freq = new Map();
  for (const x of a) freq.set(x, (freq.get(x) ?? 0) + 1);
  for (const x of b) {
    const n = freq.get(x);
    if (!n) return false;
    freq.set(x, n - 1);
  }
  return true;
}
console.log("sameFrequency:", sameFrequency([1, 2, 2, 3], [2, 3, 1, 2]), sameFrequency([1, 2, 2], [1, 1, 2]));

// 4. Read answers from the count
const [top] = [...counts].sort((x, y) => y[1] - x[1]);
console.log("most frequent:", top);
console.log("dupes:", [...counts].filter(([, n]) => n > 1).map(([v]) => v));

// --- Practice question solutions ---
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

function firstUniqChar(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) ?? 0) + 1);
  for (let i = 0; i < s.length; i++) if (freq.get(s[i]) === 1) return i;
  return -1;
}

function containsDuplicate(nums) {
  const seen = new Set();
  for (const n of nums) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, c] of freq) buckets[c].push(n);
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) result.push(...buckets[i]);
  return result.slice(0, k);
}

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

console.assert(sameFrequency([1, 2, 2, 3], [2, 3, 1, 2]) === true, "sameFrequency true");
console.assert(sameFrequency([1, 2, 2], [1, 1, 2]) === false, "sameFrequency false");
console.assert(isAnagram("listen", "silent") === true, "isAnagram true");
console.assert(isAnagram("rat", "car") === false, "isAnagram false");
console.assert(firstUniqChar("leetcode") === 0, "firstUniqChar 0");
console.assert(firstUniqChar("loveleetcode") === 2, "firstUniqChar 2");
console.assert(firstUniqChar("aabb") === -1, "firstUniqChar -1");
console.assert(containsDuplicate([1, 2, 3, 1]) === true, "containsDuplicate true");
console.assert(containsDuplicate([1, 2, 3]) === false, "containsDuplicate false");
console.assert(JSON.stringify(topKFrequent([1, 1, 1, 2, 2, 3], 2)) === "[1,2]", "topKFrequent");
console.assert(
  JSON.stringify(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])) ===
    JSON.stringify([["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]),
  "groupAnagrams"
);
console.log("topKFrequent:", topKFrequent([1, 1, 1, 2, 2, 3], 2));
console.log("groupAnagrams:", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
console.log("All frequency-counter checks ran (no assertion errors above = pass).");

// --- Exercises ---
// a) Write canConstruct(note, magazine): can `note` be built from the letters of `magazine` (each letter used once)?
// b) Given an array of votes ["A","B","A","C","B","A"], return the winner; break ties by who reached the count first.
// c) Return the intersection of two arrays INCLUDING duplicates: [1,2,2,1] and [2,2] -> [2,2].
