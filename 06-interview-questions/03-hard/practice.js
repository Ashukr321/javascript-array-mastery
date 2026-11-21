// Practice: hard interview questions
// Run: node practice.js  (silence until the final line = every check passed)

let failures = 0;
const check = (name, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures++;
  console.assert(ok, `${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
};

// 1. Trapping rain water (two pointers)
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
check("trap", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
check("trap 2", trap([4, 2, 0, 3, 2, 5]), 9);
check("trap empty", trap([]), 0);

// 2. Sliding window maximum (monotonic deque of indexes)
function maxSlidingWindow(nums, k) {
  const deque = []; // indexes, values decreasing from head to tail
  let head = 0; // moving head instead of shift() keeps it O(n)
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    if (head < deque.length && deque[head] <= i - k) head++;
    while (deque.length > head && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) out.push(nums[deque[head]]);
  }
  return out;
}
check("slidingMax", maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]);
check("slidingMax k=1", maxSlidingWindow([4, 2], 1), [4, 2]);

// 3. Median of two sorted arrays in O(log(min(m, n)))
function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a];
  const m = a.length;
  const n = b.length;
  const half = Math.floor((m + n + 1) / 2);
  let lo = 0;
  let hi = m;
  while (lo <= hi) {
    const i = Math.floor((lo + hi) / 2); // elements taken from a
    const j = half - i; // elements taken from b
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
check("median odd", findMedianSortedArrays([1, 3], [2]), 2);
check("median even", findMedianSortedArrays([1, 2], [3, 4]), 2.5);
check("median one empty", findMedianSortedArrays([], [5]), 5);

// 4. Longest increasing subsequence in O(n log n)
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
    tails[lo] = x;
  }
  return tails.length;
}
check("LIS", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]), 4);
check("LIS duplicates", lengthOfLIS([7, 7, 7]), 1);

// 5. Count subarrays that sum to k (prefix sum + map)
function subarraySum(nums, k) {
  const seen = new Map([[0, 1]]); // prefix sum -> how many times seen
  let prefix = 0;
  let count = 0;
  for (const n of nums) {
    prefix += n;
    count += seen.get(prefix - k) || 0;
    seen.set(prefix, (seen.get(prefix) || 0) + 1);
  }
  return count;
}
check("subarraySum", subarraySum([1, 1, 1], 2), 2);
check("subarraySum negatives", subarraySum([1, -1, 0], 0), 3);

// 6. Minimum length subarray with sum >= target (positive numbers, sliding window)
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
check("minSubArrayLen", minSubArrayLen(7, [2, 3, 1, 2, 4, 3]), 2);
check("minSubArrayLen none", minSubArrayLen(100, [1, 2]), 0);

// 7. First missing positive in O(n) time, O(1) space
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
check("firstMissing", firstMissingPositive([3, 4, -1, 1]), 2);
check("firstMissing all present", firstMissingPositive([1, 2, 3]), 4);
check("firstMissing dupes", firstMissingPositive([1, 1]), 2);

// 8. 3Sum: unique triplets that sum to 0
function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const out = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (a[i] > 0) break;
    if (i > 0 && a[i] === a[i - 1]) continue;
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
check("threeSum", threeSum([-1, 0, 1, 2, -1, -4]), [[-1, -1, 2], [-1, 0, 1]]);
check("threeSum zeros", threeSum([0, 0, 0, 0]), [[0, 0, 0]]);

// 9. Array.prototype.flat with depth
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
const deep = [1, [2, [3, [4]]], , 5];
check("flat default", flat(deep), deep.flat());
check("flat 2", flat(deep, 2), deep.flat(2));
check("flat Infinity", flat(deep, Infinity), [1, 2, 3, 4, 5]);
check("flat 0", flat([[1], 2], 0), [[1], 2]);

// 10. Stable sort (merge sort) with a comparator
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
const people = [
  { name: "A", age: 30 },
  { name: "B", age: 25 },
  { name: "C", age: 30 },
  { name: "D", age: 25 },
];
check("mergeSort stable", mergeSort(people, (x, y) => x.age - y.age).map((p) => p.name), ["B", "D", "A", "C"]);
check("mergeSort numbers", mergeSort([5, 1, 4, 2, 3]), [1, 2, 3, 4, 5]);
check("mergeSort no mutation", (() => { const x = [2, 1]; mergeSort(x); return x; })(), [2, 1]);

// 11. Spec-like reduce polyfill with all edge cases
function reduce(arrayLike, callback, initialValue) {
  if (arrayLike == null) throw new TypeError("reduce called on null or undefined");
  if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
  const o = Object(arrayLike);
  const len = o.length >>> 0;
  let i = 0;
  let acc;
  if (arguments.length >= 3) {
    acc = initialValue;
  } else {
    while (i < len && !(i in o)) i++;
    if (i >= len) throw new TypeError("Reduce of empty array with no initial value");
    acc = o[i++];
  }
  for (; i < len; i++) {
    if (i in o) acc = callback(acc, o[i], i, o);
  }
  return acc;
}
const throwsType = (fn) => {
  try {
    fn();
    return false;
  } catch (e) {
    return e instanceof TypeError;
  }
};
check("reduce sum", reduce([1, 2, 3], (a, b) => a + b), 6);
check("reduce init", reduce([1, 2, 3], (a, b) => a + b, 10), 16);
check("reduce undefined init", reduce([1], (a, b) => [a, b], undefined), [null, 1]); // JSON: undefined -> null
check("reduce holes", reduce([, 2, , 3], (a, b) => a + b), 5);
check("reduce single no init", reduce([7], () => 0), 7);
check("reduce array-like", reduce({ length: 2, 0: "a", 1: "b" }, (a, b) => a + b), "ab");
check("reduce empty throws", throwsType(() => reduce([], (a, b) => a + b)), true);
check("reduce bad cb throws", throwsType(() => reduce([1], null)), true);
check("reduce null throws", throwsType(() => reduce(null, (a) => a)), true);

// 12. Merge k sorted arrays (divide and conquer, O(N log k))
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
    for (let i = 0; i < list.length; i += 2) next.push(i + 1 < list.length ? mergeTwo(list[i], list[i + 1]) : list[i]);
    list = next;
  }
  return list[0];
}
check("mergeK", mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]), [1, 1, 2, 3, 4, 4, 5, 6]);
check("mergeK empty", mergeKSorted([]), []);

// 13. Kth largest element (quickselect, average O(n))
function findKthLargest(nums, k) {
  const a = [...nums];
  const target = a.length - k; // index in ascending order
  let lo = 0;
  let hi = a.length - 1;
  while (true) {
    const p = lo + Math.floor(Math.random() * (hi - lo + 1)); // random pivot avoids O(n^2) on sorted input
    [a[p], a[hi]] = [a[hi], a[p]];
    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (a[i] < a[hi]) {
        [a[i], a[store]] = [a[store], a[i]];
        store++;
      }
    }
    [a[store], a[hi]] = [a[hi], a[store]];
    if (store === target) return a[store];
    if (store < target) lo = store + 1;
    else hi = store - 1;
  }
}
for (let run = 0; run < 20; run++) {
  check("kthLargest", findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
  check("kthLargest dupes", findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4);
}

// 14. Count inversions (pairs i < j with a[i] > a[j]) using merge sort
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
check("inversions", countInversions([2, 4, 1, 3, 5]), 3);
check("inversions reversed", countInversions([5, 4, 3, 2, 1]), 10);
check("inversions sorted", countInversions([1, 2, 3]), 0);

if (failures === 0) console.log("All hard checks passed.");

// --- Exercises ---
// a) Return the actual longest increasing subsequence (not just its length) in O(n log n).
// b) Find the length of the longest subarray whose sum equals k (prefix sum + first-seen index map).
// c) Given an unsorted array, find the smallest positive integer that cannot be formed as a sum of any subset.
