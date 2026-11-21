# Two Pointer

The two pointer pattern walks an array with two indexes at once, either from **both ends toward the middle** or **one slow, one fast** in the same direction. Use it when the array is sorted (or can be), when you need pairs that meet a condition, when checking palindromes, or when removing/moving items in place without extra memory. It usually replaces an O(n²) pair search with O(n) and O(1) space.

## 1. Opposite ends: pair sum in a sorted array

If the sum is too small, move `left` right (bigger values). If too big, move `right` left.

```js
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

pairWithSum([1, 2, 4, 7, 11, 15], 15); // [2, 4]  (4 + 11)
```

## 2. Opposite ends: reverse or palindrome check

```js
function isPalindrome(s) {
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i++] !== s[j--]) return false;
  }
  return true;
}

isPalindrome("racecar"); // true
```

## 3. Same direction (slow / fast): remove in place

`slow` marks where the next kept item goes; `fast` scans everything.

```js
// Remove duplicates from a SORTED array in place, return new length
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) nums[++slow] = nums[fast];
  }
  return slow + 1;
}

const arr = [1, 1, 2, 3, 3];
removeDuplicates(arr); // 3, arr starts with [1, 2, 3]
```

## 4. Two arrays: merge sorted lists

```js
function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  return out.concat(a.slice(i), b.slice(j));
}

mergeSorted([1, 4, 7], [2, 3, 8]); // [1, 2, 3, 4, 7, 8]
```

## Complexity

| Problem | Brute force | Two pointer |
|---|---|---|
| Pair with target sum (sorted) | O(n²) | O(n), O(1) space |
| Three sum | O(n³) | O(n²) after O(n log n) sort |
| Remove duplicates in place | O(n²) with `splice` | O(n) |
| Merge two sorted arrays | O((n+m) log(n+m)) concat + sort | O(n + m) |

Unsorted pair sum? Sort first (O(n log n)) or use a hash set (O(n) time, O(n) space).

## Gotchas

- Opposite-end pointers only work when moving a pointer has a predictable effect, which usually means **sorted** input.
- Use `while (left < right)`, not `<=`, for pairs, or an element pairs with itself.
- `nums.sort()` without a comparator sorts as strings: `[10, 9, 1].sort()` gives `[1, 10, 9]`. Always use `(a, b) => a - b`.
- Sorting changes indexes. If the question wants original indexes, use a hash map instead.
- When skipping duplicates (three sum), skip **after** recording a match, or you lose valid answers.

## Interview tip

Ask "is the input sorted?" first. If yes, say "two pointers from both ends, O(n), O(1) space". If not, compare sorting first vs a hash map, and pick based on whether original indexes matter.

## Practice questions

### 1. Two sum II (sorted input)

Return the 1-based indexes of two numbers that add to `target`.

`twoSumSorted([2, 7, 11, 15], 9)` → `[1, 2]`

Brute force: try every pair, O(n²). Pattern: opposite ends, O(n).

<details><summary>Solution</summary>

```js
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
```

</details>

### 2. Valid palindrome

Ignoring case and non-alphanumeric characters, is the string a palindrome?

`isValidPalindrome("A man, a plan, a canal: Panama")` → `true`, `isValidPalindrome("race a car")` → `false`

Brute force: clean, reverse and compare, O(n) time but O(n) space. Pattern: skip junk with two pointers, O(1) space.

<details><summary>Solution</summary>

```js
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
```

</details>

### 3. Move zeroes

Move all `0`s to the end in place, keeping the order of the other values.

`moveZeroes([0, 1, 0, 3, 12])` → `[1, 3, 12, 0, 0]`

Brute force: `splice` each zero and `push` it, O(n²). Pattern: slow/fast swap, O(n).

<details><summary>Solution</summary>

```js
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
```

</details>

### 4. Container with most water

Pick two lines that hold the most water: area = `min(h[i], h[j]) * (j - i)`.

`maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])` → `49`

Brute force: every pair, O(n²). Pattern: start wide, always move the shorter side inward, O(n).

<details><summary>Solution</summary>

```js
function maxArea(height) {
  let l = 0, r = height.length - 1, best = 0;
  while (l < r) {
    best = Math.max(best, Math.min(height[l], height[r]) * (r - l));
    if (height[l] < height[r]) l++;
    else r--;
  }
  return best;
}
```

</details>

### 5. Three sum

Return all unique triplets that sum to `0`.

`threeSum([-1, 0, 1, 2, -1, -4])` → `[[-1, -1, 2], [-1, 0, 1]]`

Brute force: three nested loops plus dedupe, O(n³). Pattern: sort, fix one value, two-pointer the rest, O(n²).

<details><summary>Solution</summary>

```js
function threeSum(nums) {
  const a = [...nums].sort((x, y) => x - y);
  const result = [];
  for (let i = 0; i < a.length - 2; i++) {
    if (i > 0 && a[i] === a[i - 1]) continue; // skip duplicate anchors
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
```

</details>
