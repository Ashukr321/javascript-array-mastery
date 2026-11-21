// Practice: sliding window
// Run: node practice.js

// 1. Fixed-size window
function maxSumOfK(nums, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += nums[i];
  let best = windowSum;
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    best = Math.max(best, windowSum);
  }
  return best;
}
console.log("maxSumOfK:", maxSumOfK([2, 1, 5, 1, 3, 2], 3));

// 2. Variable window: shortest subarray with sum >= target
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
console.log("minSubArrayLen:", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));

// 3. Window + map: longest substring without repeats
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
console.log("lengthOfLongestSubstring:", lengthOfLongestSubstring("abcabcbb"));

// 4. Moving average
const prices = [10, 12, 11, 15, 14];
const k = 3;
let s = 0;
const movingAvg = [];
prices.forEach((p, i) => {
  s += p;
  if (i >= k) s -= prices[i - k];
  if (i >= k - 1) movingAvg.push(+(s / k).toFixed(2));
});
console.log("movingAvg:", movingAvg);

// --- Practice question solutions ---
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

function findAnagrams(str, p) {
  const result = [];
  if (p.length > str.length) return result;
  const need = new Array(26).fill(0);
  const have = new Array(26).fill(0);
  const idx = (ch) => ch.charCodeAt(0) - 97;
  for (const ch of p) need[idx(ch)]++;
  for (let i = 0; i < str.length; i++) {
    have[idx(str[i])]++;
    if (i >= p.length) have[idx(str[i - p.length])]--;
    if (i >= p.length - 1 && have.every((c, j) => c === need[j])) result.push(i - p.length + 1);
  }
  return result;
}

console.assert(maxSumOfK([2, 1, 5, 1, 3, 2], 3) === 9, "maxSumOfK");
console.assert(JSON.stringify(movingAvg) === "[11,12.67,13.33]", "movingAvg");
console.assert(findMaxAverage([1, 12, -5, -6, 50, 3], 4) === 12.75, "findMaxAverage");
console.assert(lengthOfLongestSubstring("abcabcbb") === 3, "longest abcabcbb");
console.assert(lengthOfLongestSubstring("pwwkew") === 3, "longest pwwkew");
console.assert(lengthOfLongestSubstring("bbbbb") === 1, "longest bbbbb");
console.assert(lengthOfLongestSubstring("abba") === 2, "longest abba (stale left)");
console.assert(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]) === 2, "minSubArrayLen 2");
console.assert(minSubArrayLen(11, [1, 1, 1]) === 0, "minSubArrayLen 0");
console.assert(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2) === 6, "longestOnes");
console.assert(JSON.stringify(findAnagrams("cbaebabacd", "abc")) === "[0,6]", "findAnagrams");
console.assert(JSON.stringify(findAnagrams("abab", "ab")) === "[0,1,2]", "findAnagrams overlap");
console.log("findAnagrams:", findAnagrams("cbaebabacd", "abc"));
console.log("All sliding-window checks ran (no assertion errors above = pass).");

// --- Exercises ---
// a) Return the longest substring with at most 2 distinct characters ("eceba" -> "ece").
// b) Given temperatures and k, return the max temperature in every window of size k (try O(n) with a deque).
// c) Count subarrays of size k whose average is >= threshold.
