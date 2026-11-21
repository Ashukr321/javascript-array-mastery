# Code Examples: Array Recipes

Small, copy-paste array helpers you keep writing in real projects: grouping API results, splitting lists into pages, building reports, cleaning data. Each recipe is a few lines of plain JavaScript, so you rarely need lodash for them.

## 1. groupBy (`Object.groupBy`)

Group items into buckets by a key.

```js
const products = [
  { name: "Laptop", category: "tech", price: 900 },
  { name: "Shirt", category: "fashion", price: 30 },
  { name: "Phone", category: "tech", price: 600 },
];

// Modern (Node 21+, all current browsers)
const byCategory = Object.groupBy(products, (p) => p.category);
// { tech: [Laptop, Phone], fashion: [Shirt] }

// Map version: keeps non-string keys
const byPriceBand = Map.groupBy(products, (p) => (p.price > 500 ? "high" : "low"));

// Fallback with reduce (older runtimes)
const groupBy = (arr, fn) =>
  arr.reduce((acc, x) => {
    (acc[fn(x)] ??= []).push(x);
    return acc;
  }, {});
```

## 2. chunk

Split an array into pieces of size `n` (pagination, batching API calls).

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

## 3. zip

Pair up items at the same index from several arrays.

```js
const zip = (...arrays) =>
  Array.from({ length: Math.min(...arrays.map((a) => a.length)) }, (_, i) =>
    arrays.map((a) => a[i])
  );

zip(["a", "b", "c"], [1, 2, 3]); // [["a", 1], ["b", 2], ["c", 3]]
Object.fromEntries(zip(["id", "name"], [7, "Asha"])); // { id: 7, name: "Asha" }
```

## 4. partition

Split into `[pass, fail]` in one pass.

```js
const partition = (arr, fn) =>
  arr.reduce((acc, x) => (acc[fn(x) ? 0 : 1].push(x), acc), [[], []]);

const [even, odd] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
// even = [2, 4], odd = [1, 3, 5]
```

## 5. range

Generate a sequence of numbers.

```js
const range = (start, end, step = 1) =>
  Array.from({ length: Math.max(0, Math.ceil((end - start) / step)) }, (_, i) => start + i * step);

range(0, 5);     // [0, 1, 2, 3, 4]
range(0, 10, 3); // [0, 3, 6, 9]
range(5, 0, -1); // [5, 4, 3, 2, 1]
```

## 6. shuffle (Fisher-Yates)

The only correct simple shuffle. Swap each position with a random earlier (or same) position, walking backwards.

```js
const shuffle = (arr) => {
  const a = [...arr]; // don't mutate the input
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
```

`arr.sort(() => Math.random() - 0.5)` looks shorter but is **biased**: some orders come up far more often than others.

## 7. sum / average by key

```js
const sumBy = (arr, fn) => arr.reduce((total, x) => total + fn(x), 0);
const avgBy = (arr, fn) => (arr.length ? sumBy(arr, fn) / arr.length : 0);

sumBy(products, (p) => p.price); // 1530
avgBy(products, (p) => p.price); // 510
```

## 8. countBy

Count items per key (a frequency counter).

```js
const countBy = (arr, fn) =>
  arr.reduce((acc, x) => {
    const k = fn(x);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

countBy(products, (p) => p.category); // { tech: 2, fashion: 1 }
countBy(["a", "bb", "cc"], (s) => s.length); // { 1: 1, 2: 2 }
```

## 9. uniqueBy

Keep the first item for each key (see `07-real-world-usecases/01-deduplication` for more).

```js
const uniqueBy = (arr, fn) => {
  const seen = new Set();
  return arr.filter((x) => {
    const k = fn(x);
    return !seen.has(k) && seen.add(k);
  });
};

uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], (u) => u.id); // [{ id: 1 }, { id: 2 }]
```

## 10. Sort by multiple keys

Compare by the first key; when equal, fall through to the next with `||`.

```js
const people = [
  { name: "Ravi", dept: "eng", age: 30 },
  { name: "Asha", dept: "eng", age: 25 },
  { name: "Meera", dept: "hr", age: 28 },
];

const sorted = people.toSorted(
  (a, b) => a.dept.localeCompare(b.dept) || b.age - a.age // dept A-Z, then age high-low
);
// Ravi (eng, 30), Asha (eng, 25), Meera (hr, 28)
```

`toSorted` (Node 20+) returns a new array; `sort` mutates. Both are stable, so equal items keep their order.

## 11. compact

Remove falsy values (`false`, `0`, `""`, `null`, `undefined`, `NaN`).

```js
const compact = (arr) => arr.filter(Boolean);

compact([0, 1, "", "a", null, undefined, NaN, false, 2]); // [1, "a", 2]

// Only drop null/undefined, keep 0 and ""
const withoutNullish = (arr) => arr.filter((x) => x != null);
```

## 12. difference / intersection / union

Build a `Set` from one side so each lookup is O(1).

```js
const difference = (a, b) => {
  const B = new Set(b);
  return a.filter((x) => !B.has(x));
};
const intersection = (a, b) => {
  const B = new Set(b);
  return a.filter((x) => B.has(x));
};
const union = (a, b) => [...new Set([...a, ...b])];

difference([1, 2, 3, 4], [2, 4]);   // [1, 3]
intersection([1, 2, 3, 4], [2, 4, 6]); // [2, 4]
union([1, 2], [2, 3]);             // [1, 2, 3]
```

Newer runtimes (Node 22+) also have `new Set(a).difference(new Set(b))`, `.intersection()` and `.union()`.

## Complexity

| Recipe | Time | Notes |
|---|---|---|
| groupBy / countBy / partition | O(n) | one pass |
| chunk / zip / range / compact | O(n) | |
| shuffle (Fisher-Yates) | O(n) | unbiased |
| `sort(() => Math.random() - 0.5)` | O(n log n) | biased, avoid |
| sumBy / avgBy | O(n) | |
| uniqueBy | O(n) | Set of keys |
| sort by multiple keys | O(n log n) | stable |
| difference / intersection with `Set` | O(n + m) | `filter` + `includes` would be O(n · m) |

## Gotchas

- `Object.groupBy` returns an object with a `null` prototype: `byCategory.hasOwnProperty` does not exist. Use `Object.hasOwn(byCategory, key)` or `key in byCategory`.
- Object keys are strings: `countBy` on numbers gives `{ "1": ... }`. Use `Map.groupBy` or a `Map` if you need the real type.
- `chunk(arr, 0)` throws `RangeError: Invalid array length` (length becomes `Infinity`), and a `while` loop version would never end. Validate `size > 0`.
- `compact` also drops `0`, which is often a real value (prices, counts). Use the nullish version for numbers.
- `Set` compares objects by reference, so `difference` on arrays of objects needs a key: `new Set(b.map((x) => x.id))`.
- `sort` without a comparator sorts numbers as strings.

## Interview tip

Interviewers often ask "implement lodash's `groupBy` / `chunk` / `shuffle`". Write the `reduce` or `Array.from` version, say its complexity, then mention the built-in (`Object.groupBy`, `Set.prototype.difference`) to show you know the modern API. For shuffle, always name Fisher-Yates and explain why the `sort` trick is biased.
