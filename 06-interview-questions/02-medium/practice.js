// Practice: medium interview questions
// Run: node practice.js  (silence until the final line = every check passed)

let failures = 0;
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.assert(ok, `${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
};

// 1. Two sum: indexes of the two numbers that add up to target
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return null;
}
check("twoSum", twoSum([2, 7, 11, 15], 9), [0, 1]);
check("twoSum same value", twoSum([3, 3], 6), [0, 1]);
check("twoSum none", twoSum([1, 2], 10), null);

// 2. Group by
function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] ||= []).push(item);
    return groups;
  }, {});
}
check("groupBy", groupBy([1.2, 1.8, 2.1, 3.5], Math.floor), { 1: [1.2, 1.8], 2: [2.1], 3: [3.5] });
check("groupBy objects", groupBy([{ t: "a" }, { t: "b" }, { t: "a" }], (o) => o.t), {
  a: [{ t: "a" }, { t: "a" }],
  b: [{ t: "b" }],
});

// 3. Deep flatten: recursive and iterative
function flattenDeep(arr) {
  const out = [];
  for (const x of arr) {
    if (Array.isArray(x)) out.push(...flattenDeep(x));
    else out.push(x);
  }
  return out;
}
function flattenDeepIterative(arr) {
  const stack = [...arr];
  const out = [];
  while (stack.length) {
    const x = stack.pop();
    if (Array.isArray(x)) stack.push(...x);
    else out.push(x);
  }
  return out.reverse();
}
const nested = [1, [2, [3, [4, [5]]]], 6];
check("flattenDeep", flattenDeep(nested), [1, 2, 3, 4, 5, 6]);
check("flattenDeepIterative", flattenDeepIterative(nested), [1, 2, 3, 4, 5, 6]);
check("flat(Infinity)", nested.flat(Infinity), [1, 2, 3, 4, 5, 6]);

// 4. map / filter / reduce polyfills (named myMap etc. so we do not overwrite the real ones)
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
    while (i < this.length && !(i in this)) i++;
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) {
    if (i in this) acc = cb(acc, this[i], i, this);
  }
  return acc;
};
check("myMap", [1, 2, 3].myMap((x) => x * 2), [2, 4, 6]);
check("myMap keeps holes", 1 in [1, , 3].myMap((x) => x), false);
check("myFilter", [1, 2, 3, 4].myFilter((x) => x % 2 === 0), [2, 4]);
check("myReduce", [1, 2, 3].myReduce((a, b) => a + b, 0), 6);
check("myReduce no init", [1, 2, 3].myReduce((a, b) => a + b), 6);
let threw = false;
try {
  [].myReduce((a, b) => a + b);
} catch (e) {
  threw = e instanceof TypeError;
}
check("myReduce empty throws", threw, true);

// 5. Move zeros to the end, in place, keeping order
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
check("moveZeros", moveZeros([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]);

// 6. Intersection of two arrays (unique values)
function intersection(a, b) {
  const setB = new Set(b);
  return [...new Set(a)].filter((x) => setB.has(x));
}
check("intersection", intersection([1, 2, 2, 3, 4], [2, 2, 4, 5]), [2, 4]);

// 7. Maximum subarray sum (Kadane)
function maxSubarray(nums) {
  let best = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}
check("kadane", maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
check("kadane all negative", maxSubarray([-3, -1, -2]), -1);

// 8. Product of array except self (no division)
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
check("productExceptSelf", productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
check("productExceptSelf zero", productExceptSelf([2, 0, 3]), [0, 6, 0]);

// 9. Group anagrams
function groupAnagrams(words) {
  const groups = new Map();
  for (const w of words) {
    const key = [...w].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(w);
  }
  return [...groups.values()];
}
check("groupAnagrams", groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]), [
  ["eat", "tea", "ate"],
  ["tan", "nat"],
  ["bat"],
]);

// 10. Longest consecutive sequence in O(n)
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
check("longestConsecutive", longestConsecutive([100, 4, 200, 1, 3, 2]), 4);
check("longestConsecutive empty", longestConsecutive([]), 0);

// 11. Merge overlapping intervals
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
check("mergeIntervals", mergeIntervals([[8, 10], [1, 3], [2, 6], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
check("mergeIntervals touching", mergeIntervals([[1, 4], [4, 5]]), [[1, 5]]);

// 12. Rotate right by k in place (three reverses, O(1) space)
function rotateInPlace(nums, k) {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n;
  const reverse = (i, j) => {
    for (; i < j; i++, j--) [nums[i], nums[j]] = [nums[j], nums[i]];
  };
  reverse(0, n - 1);
  reverse(0, k - 1);
  reverse(k, n - 1);
  return nums;
}
check("rotateInPlace", rotateInPlace([1, 2, 3, 4, 5, 6, 7], 3), [5, 6, 7, 1, 2, 3, 4]);
check("rotateInPlace k > n", rotateInPlace([1, 2], 3), [2, 1]);

// 13. Predict the output: holes, NaN and delete
check("Array(3).map", Array(3).map(() => 0).length, 3);
check("Array(3).map leaves holes", 0 in Array(3).map(() => 0), false);
check("Array.from length", Array.from({ length: 3 }, () => 0), [0, 0, 0]);
check("indexOf NaN", [NaN].indexOf(NaN), -1);
check("includes NaN", [NaN].includes(NaN), true);
const d = [1, 2, 3];
delete d[1];
check("delete keeps length", d.length, 3);
check("delete leaves hole", 1 in d, false);

// 14. Predict the output: comparisons and copies
check("[] == []", [] == [], false);
check("typeof []", typeof [], "object");
check("Array.isArray", Array.isArray([]), true);
const orig = [{ n: 1 }];
const copy = [...orig];
copy[0].n = 99;
check("spread is shallow", orig[0].n, 99);
check("sort returns same array", (() => { const x = [2, 1]; return x.sort() === x; })(), true);

if (failures === 0) console.log("All medium checks passed.");

// --- Exercises ---
// a) Find all pairs in an array that sum to a target, without returning duplicate pairs.
// b) Given an array of meeting intervals, return the minimum number of rooms needed.
// c) Implement Array.prototype.myFind and myFindLastIndex, including the thisArg parameter.
