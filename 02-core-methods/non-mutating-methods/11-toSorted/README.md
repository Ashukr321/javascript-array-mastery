# toSorted

`toSorted()` works just like `sort()`, with one big difference: `sort` is a **mutating** method that reorders the original array, while `toSorted` is **non-mutating**. It sorts the elements the same way `sort` does but returns a **new sorted array** and leaves the original untouched. This makes it the natural choice for sorting React state, props, or any shared data.

## Syntax

```js
const sorted = array.toSorted();                // default: compare as strings
const sorted2 = array.toSorted((a, b) => a - b); // with a compare function
```

- `compareFn(a, b)` (optional): return negative if `a` comes first, positive if `b` comes first, `0` to keep their order. With it you choose ascending or descending order.
- **Returns**: a **new** sorted array.
- **Does not mutate** the original array.
- **Support**: ES2023. Node.js 20+, Chrome/Edge 110+, Firefox 115+, Safari 16+. Fallback: `[...arr].sort(compareFn)`.

## 1. Basic usage

```js
const arr = [3, 2, 3, 4, 5, 5, 1];

arr.toSorted((a, b) => a - b); // [1, 2, 3, 3, 4, 5, 5]  ascending
arr.toSorted((a, b) => b - a); // [5, 5, 4, 3, 3, 2, 1]  descending
arr;                           // [3, 2, 3, 4, 5, 5, 1]  (unchanged)
```

## 2. Same rules as sort

The default order is still a **string** sort:

```js
[10, 1, 5].toSorted();               // [1, 10, 5]
[10, 1, 5].toSorted((a, b) => a - b); // [1, 5, 10]
```

## 3. Strings with localeCompare

```js
const cities = ["delhi", "Agra", "Bengaluru"];
cities.toSorted();                                // ["Agra", "Bengaluru", "delhi"]  (uppercase first)
cities.toSorted((a, b) => a.localeCompare(b));    // ["Agra", "Bengaluru", "delhi"]
["b", "A", "a"].toSorted((a, b) => a.localeCompare(b)); // ["a", "A", "b"]
```

## 4. Real-world example: sortable product table

```js
const products = [
  { name: "Watch", price: 2499, addedAt: "2024-03-10" },
  { name: "Shoes", price: 1299, addedAt: "2024-05-01" },
  { name: "bag", price: 899, addedAt: "2024-01-20" },
];

const byPrice = products.toSorted((a, b) => a.price - b.price);
const byName = products.toSorted((a, b) => a.name.localeCompare(b.name));
const newest = products.toSorted((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

byPrice.map((p) => p.name); // ["bag", "Shoes", "Watch"]
byName.map((p) => p.name);  // ["bag", "Shoes", "Watch"]
newest.map((p) => p.name);  // ["Shoes", "Watch", "bag"]
products[0].name;           // "Watch"  (original order kept)
```

`toSorted` fits because each view is derived from the same list, and the original must stay intact for the next sort.

## 5. Real-world example: sort React state immutably

```jsx
// one-line state update, no manual copy
setTodos((prev) => prev.toSorted((a, b) => a.priority - b.priority));

// derive a sorted view during render
function Leaderboard({ players }) {
  const ranked = players.toSorted((a, b) => b.score - a.score);
  return ranked.map((p, i) => <li key={p.id}>{i + 1}. {p.name}</li>);
}
```

`players.sort(...)` would reorder the parent's prop in place; `toSorted` returns a fresh array, which is also a new reference React can detect.

## 6. Real-world example: top 3 without disturbing the original

```js
const scores = [72, 95, 88, 60, 99];
const top3 = scores.toSorted((a, b) => b - a).slice(0, 3); // [99, 95, 88]
scores; // [72, 95, 88, 60, 99]
```

It fits because the scores are still needed in their original (submission) order elsewhere.

## Gotchas

- Default is a string sort, same as `sort`: always pass `(a, b) => a - b` for numbers.
- The copy is **shallow**: objects are shared with the original.
- Holes in sparse arrays become `undefined` (and are sorted to the end).
- Stable, like `sort`: equal elements keep their original order.
- Not available in Node.js 18 or older browsers (`TypeError: ... is not a function`).

## Comparison

| Method | Mutates? | Returns | Notes |
| --- | --- | --- | --- |
| `sort(fn)` | Yes | Same array | Oldest, works everywhere |
| `toSorted(fn)` | No | New array | ES2023 |
| `[...arr].sort(fn)` | No | New array | Pre-ES2023 fallback |
| `toReversed()` | No | New array | Flips order, does not sort |

## Interview questions

**1. What is the difference between `sort` and `toSorted`?**

<details>
<summary>Answer</summary>

Both sort with the same rules and optional compare function. `sort` mutates the array and returns the same reference; `toSorted` returns a new sorted array and leaves the original unchanged.

</details>

**2. What does `[3, 20, 100].toSorted()` return?**

<details>
<summary>Answer</summary>

`[100, 20, 3]`. Without a compare function the numbers are compared as strings (`"100" < "20" < "3"`).

</details>

**3. Why prefer `toSorted` when sorting React state?**

<details>
<summary>Answer</summary>

It never mutates the current state and returns a new array reference, so React sees the change and re-renders. `state.sort()` mutates state and keeps the same reference.

</details>

**4. If you sort an array of objects with `toSorted` and then edit `sorted[0].name`, does the original change?**

<details>
<summary>Answer</summary>

Yes. The array is new but the objects inside are the same references (shallow copy).

</details>
