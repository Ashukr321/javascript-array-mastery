# lastIndexOf

`lastIndexOf()` is just like `indexOf()`, but it searches from **right to left**. `indexOf` starts at the beginning of the array and returns the first match; `lastIndexOf` starts at the end and returns the **last** match. The index it returns is still counted from the start of the array. It works on strings too.

## Syntax

```js
array.lastIndexOf(searchElement, fromIndex)
```

- `searchElement`: the value to find, compared with strict equality (`===`).
- `fromIndex` (optional, default `array.length - 1`): the index to start searching **backwards** from. A negative value counts from the end.
- **Returns:** the index of the last match, or `-1` if not found.
- **Mutates:** no.

## 1. Basic search

```js
const arr = [1, 3, 4, 4];
arr.lastIndexOf(4); // 3
arr.indexOf(4);     // 2
arr.lastIndexOf(9); // -1
```

## 2. `fromIndex` searches backwards from that point

```js
const nums = [1, 2, 1, 2, 1];
nums.lastIndexOf(1, 3);  // 2  looks at indexes 3, 2, 1, 0
nums.lastIndexOf(2, -2); // 3  -2 means index 3
nums.lastIndexOf(1, 0);  // 0
```

## 3. Strings

```js
"file.tar.gz".lastIndexOf(".");  // 8
"Ashutosh".lastIndexOf("h");     // 7
```

## 4. Real-world: file extension and file name

```js
const path = "uploads/2026/report.final.pdf";
const fileName = path.slice(path.lastIndexOf("/") + 1);       // "report.final.pdf"
const ext = fileName.slice(fileName.lastIndexOf(".") + 1);    // "pdf"
```

Paths and file names can contain many `/` and `.`, and only the **last** one matters, so searching from the right is the right tool.

## 5. Real-world: last visit in a navigation history

```js
const history = ["/home", "/cart", "/product/7", "/cart", "/checkout"];
const lastCartVisit = history.lastIndexOf("/cart"); // 3
const stepsSinceCart = history.length - 1 - lastCartVisit; // 1
```

Analytics usually cares about the most recent occurrence, which is the last one in a chronological log.

## 6. Real-world: items that appear only once

```js
const votes = ["a", "b", "a", "c"];
const once = votes.filter((v) => votes.indexOf(v) === votes.lastIndexOf(v)); // ["b", "c"]
```

If the first and last positions are the same, the value occurs exactly once.

## Comparison

| Method | Direction | Match by | Returns |
| --- | --- | --- | --- |
| `indexOf(x)` | left to right | `===` | first index or `-1` |
| `lastIndexOf(x)` | right to left | `===` | last index or `-1` |
| `findLastIndex(fn)` | right to left | callback | last index or `-1` |
| `at(-1)` | n/a | n/a | last element (not an index) |

## Gotchas

- The returned index is counted from the **start**, not from the end.
- `fromIndex` is where the backward search **starts**, so `lastIndexOf(x, 2)` only looks at indexes 2, 1, 0.
- Like `indexOf`, it can't find `NaN` and matches objects only by reference.
- For objects, use `findLastIndex((o) => o.id === id)` (ES2023).

## Interview questions

**1. Is the index returned by `lastIndexOf` counted from the start or the end?**

<details>
<summary>Answer</summary>

From the start. Only the search direction is reversed: `[1, 2, 1].lastIndexOf(1)` is `2`.

</details>

**2. What does `[1, 2, 1, 2].lastIndexOf(2, 2)` return?**

<details>
<summary>Answer</summary>

`1`. The search starts at index 2 and goes backwards (2, 1, 0); the first `2` it meets is at index 1.

</details>

**3. How can you find the elements that occur only once using `indexOf` and `lastIndexOf`?**

<details>
<summary>Answer</summary>

```js
arr.filter((x) => arr.indexOf(x) === arr.lastIndexOf(x));
```

If the first and last occurrences are at the same index, there's only one. It's O(n²), so use a frequency map for big arrays.

</details>

**4. `lastIndexOf` vs `findLastIndex`?**

<details>
<summary>Answer</summary>

`lastIndexOf` compares a value with `===`. `findLastIndex` takes a callback, so it can match by a condition such as an object property.

</details>
