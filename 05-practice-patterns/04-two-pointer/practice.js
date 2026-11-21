// Practice: two pointer
// Run: node practice.js

// 1. Opposite ends: pair sum in sorted array
function pairWithSum(sorted, target) {
  let left = 0, right = sorted.length - 1;
  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return null;
}
console.log("pairWithSum:", pairWithSum([1, 2, 4, 7, 11, 15], 15));

// 2. Palindrome
function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) if (s[i++] !== s[j--]) return false;
  return true;
}
console.log("isPalindrome:", isPalindrome("racecar"), isPalindrome("hello"));

// 3. Slow/fast: remove duplicates from sorted array in place
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast];
  }
  return slow + 1;
}
const arr = [1, 1, 2, 3, 3];
const len = removeDuplicates(arr);
console.log("removeDuplicates:", len, arr.slice(0, len));

// 4. Merge two sorted arrays
function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}
console.log("mergeSorted:", mergeSorted([1, 4, 7], [2, 3, 8]));

// Gotcha: default sort is lexicographic
console.log("sort() gotcha:", [10, 9, 1].sort(), "vs", [10, 9, 1].sort((a, b) => a - b));

// --- Practice question solutions ---
function twoSumSorted(numbers, target) {
  let l = 0, r = numbers.length - 1;
  while (l < r) {
    const sum = numbers[l] + numbers[r];
    if (sum === target) return [l + 1, r + 1];
    if (sum < target) l++;
    else r--;
  }
  return [];
}

function isValidPalindrome(s) {
  const ok = (ch) => /[a-z0-9]/i.test(ch);
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (!ok(s[i])) i++;
    else if (!ok(s[j])) j--;
    else if (s[i++].toLowerCase() !== s[j--].toLowerCase()) return false;
  }
  return true;
}

function moveZeroes(nums) {
  let slow = 0;
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow++;
    }
  }
  return nums;
}

function maxArea(height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}

function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const result = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue;
    let l = i + 1, r = a.length - 1;
    while (l < r) {
      const sum = a[i] + a[l] + a[r];
      if (sum < 0) l++;
      else if (sum > 0) r--;
      else {
        result.push([a[i], a[l], a[r]]);
        while (l < r && a[l] === a[l + 1]) l++;
        while (l < r && a[r] === a[r - 1]) r--;
        l++;
        r--;
      }
    }
  }
  return result;
}

console.assert(JSON.stringify(pairWithSum([1, 2, 4, 7, 11, 15], 15)) === "[2,4]", "pairWithSum");
console.assert(pairWithSum([1, 2, 3], 100) === null, "pairWithSum null");
console.assert(isPalindrome("racecar") && !isPalindrome("hello"), "isPalindrome");
console.assert(len === 3 && JSON.stringify(arr.slice(0, len)) === "[1,2,3]", "removeDuplicates");
console.assert(JSON.stringify(mergeSorted([1, 4, 7], [2, 3, 8])) === "[1,2,3,4,7,8]", "mergeSorted");
console.assert(JSON.stringify(twoSumSorted([2, 7, 11, 15], 9)) === "[1,2]", "twoSumSorted");
console.assert(isValidPalindrome("A man, a plan, a canal: Panama") === true, "valid palindrome true");
console.assert(isValidPalindrome("race a car") === false, "valid palindrome false");
console.assert(JSON.stringify(moveZeroes([0, 1, 0, 3, 12])) === "[1,3,12,0,0]", "moveZeroes");
console.assert(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]) === 49, "maxArea");
console.assert(JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4])) === "[[-1,-1,2],[-1,0,1]]", "threeSum");
console.assert(JSON.stringify(threeSum([0, 0, 0, 0])) === "[[0,0,0]]", "threeSum zeros");
console.log("threeSum:", threeSum([-1, 0, 1, 2, -1, -4]));
console.log("All two-pointer checks ran (no assertion errors above = pass).");

// --- Exercises ---
// a) Given a sorted array, return the squares of each number, also sorted, in O(n) ([-4,-1,0,3,10] -> [0,1,9,16,100]).
// b) Reverse only the vowels of a string ("hello" -> "holle").
// c) Return true if `s` is a subsequence of `t` ("abc", "ahbgdc" -> true).
