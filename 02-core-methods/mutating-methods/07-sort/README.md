# sort

`sort()` puts the elements of an array in order, **in place**. It is one of the most used array methods in React and real applications: sorting a product table by price, a contact list by name, posts by date. You control ascending or descending order with a compare function. Because it mutates the original array, the usual pattern is to copy first with the spread operator (`[...arr].sort(...)`) or to use the modern non-mutating `toSorted()`.

## Syntax

```js
array.sort();                // default: compare as strings
array.sort((a, b) => a - b); // with a compare function
```

- `compareFn(a, b)` (optional): return a **negative** number if `a` should come first, **positive** if `b` should come first, `0` to keep their order.
- **Returns**: the **same** array (now sorted), not a copy.

> **Mutates the original array.** Non-mutating options: `arr.toSorted(compareFn)` (ES2023) or `[...arr].sort(compareFn)`.

A correction to the owner's note: without a compare function, `sort` does **not** sort numbers ascending. It converts every element to a **string** and sorts by UTF-16 code units. Descending order always needs a compare function (or a `reverse()` after).

## 1. Default sort is a string sort

```js
["banana", "apple", "cherry"].sort(); // ["apple", "banana", "cherry"]  (fine)
[10, 1, 5, 100].sort();               // [1, 10, 100, 5]  (wrong for numbers!)
["b", "B", "a"].sort();               // ["B", "a", "b"]  (uppercase first)
```

`undefined` values (and empty slots) are always moved to the end and never passed to the compare function.

## 2. Numbers: (a, b) => a - b

```js
const arr = [3, 1, 4, 1, 5];

[...arr].sort((a, b) => a - b); // [1, 1, 3, 4, 5]  ascending
[...arr].sort((a, b) => b - a); // [5, 4, 3, 1, 1]  descending
arr;                            // [3, 1, 4, 1, 5]  (copy was sorted, not arr)
```

`[...arr]` makes a shallow copy, so the original stays as it was.

## 3. Strings: localeCompare

```js
const names = ["Rahul", "ashu", "Émile", "Zoya"];
[...names].sort((a, b) => a.localeCompare(b)); // ["ashu", "Émile", "Rahul", "Zoya"]

const files = ["file10", "file2", "file1"];
files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
// ["file1", "file2", "file10"]
```

`localeCompare` returns negative/0/positive, exactly what `sort` wants, and handles case and accents properly.

## 4. Real-world example: sort a product table by price, name or date

```js
const products = [
  { name: "Watch", price: 2499, addedAt: "2024-03-10" },
  { name: "Shoes", price: 1299, addedAt: "2024-05-01" },
  { name: "bag", price: 1299, addedAt: "2024-01-20" },
];

const comparators = {
  price: (a, b) => a.price - b.price,
  name: (a, b) => a.name.localeCompare(b.name),
  date: (a, b) => new Date(b.addedAt) - new Date(a.addedAt), // newest first
};

function sortProducts(list, key) {
  return [...list].sort(comparators[key]);
}

sortProducts(products, "price").map((p) => p.name); // ["Shoes", "bag", "Watch"]
sortProducts(products, "name").map((p) => p.name);  // ["bag", "Shoes", "Watch"]
sortProducts(products, "date").map((p) => p.name);  // ["Shoes", "Watch", "bag"]
```

`sort` with a comparator fits because each column just needs a different "which comes first" rule. Copying first keeps the original list intact for the next sort.

## 5. Real-world example: sort state in React

```jsx
function ProductTable({ products }) {
  const [sortBy, setSortBy] = useState("price");
  // products is a prop: copy before sorting
  const rows = [...products].sort(comparators[sortBy]);
  return rows.map((p) => <Row key={p.name} product={p} />);
}

// sorting the state itself
setTodos((prev) => [...prev].sort((a, b) => a.priority - b.priority));
```

Calling `products.sort(...)` directly would reorder the parent's array behind its back, and `setTodos(todos.sort(...))` passes the same reference, so React may not re-render.

## 6. Real-world example: multi-key sort (tie breakers)

```js
const users = [
  { name: "Neha", age: 25 },
  { name: "Ashu", age: 25 },
  { name: "Rahul", age: 22 },
];

users.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));
users.map((u) => u.name); // ["Rahul", "Ashu", "Neha"]
```

When the first comparison returns `0` (same age), `||` falls through to the name comparison.

## Gotchas

- Default sort is a **string** sort: `[10, 1, 5].sort()` gives `[1, 10, 5]`. Always pass `(a, b) => a - b` for numbers.
- `sort` returns the **same** array, so `const sorted = arr.sort()` also sorts `arr`.
- The compare function must return a **number**. `(a, b) => a > b` returns a boolean and gives inconsistent results across engines.
- **Stability**: since ES2019 `sort` is guaranteed stable, so equal elements keep their original order (useful when sorting by one column after another).
- `a - b` only works for numbers (and `Date` objects). For strings use `localeCompare`.
- Spread copy is **shallow**: the objects inside are still shared with the original.

## Comparison

| Method | Mutates? | Returns | Notes |
| --- | --- | --- | --- |
| `sort(fn)` | Yes | Same array | Stable since ES2019 |
| `toSorted(fn)` | No | New array | ES2023 |
| `[...arr].sort(fn)` | No (copy is sorted) | New array | Works everywhere |
| `reverse()` | Yes | Same array | Only flips order, does not sort |

## Interview questions

**1. What does `[10, 1, 5, 100].sort()` return and why?**

<details>
<summary>Answer</summary>

`[1, 10, 100, 5]`. Without a compare function, elements are converted to strings and compared character by character, and `"10"` comes before `"5"`.

</details>

**2. How do you sort numbers in descending order without mutating the array?**

<details>
<summary>Answer</summary>

`arr.toSorted((a, b) => b - a)`, or `[...arr].sort((a, b) => b - a)`.

</details>

**3. Is `Array.prototype.sort` stable?**

<details>
<summary>Answer</summary>

Yes, since ES2019 the spec requires it. Elements that compare equal keep their original relative order.

</details>

**4. Sort objects by `name` alphabetically, ignoring case.**

<details>
<summary>Answer</summary>

```js
users.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
```

</details>
