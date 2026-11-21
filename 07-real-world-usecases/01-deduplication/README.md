# Deduplication

Removing duplicate values from an array is one of the most common real-world array tasks: cleaning tags, merging API results, building unique dropdown options, or removing repeated user IDs.

## 1. Primitives: use a `Set`

A `Set` only stores unique values, so spreading it back into an array removes duplicates in **O(n)**.

```js
const tags = ["js", "css", "js", "html", "css"];
const unique = [...new Set(tags)];
// ["js", "css", "html"]  (first-seen order is kept)
```

`Array.from(new Set(tags))` does the same thing.

## 2. `filter` + `indexOf` (classic interview answer)

Keep an element only if this is the **first** index where it appears.

```js
const unique = tags.filter((tag, i, arr) => arr.indexOf(tag) === i);
```

Readable, but **O(n²)**: `indexOf` scans the array for every element. Fine for small lists, slow for large ones.

## 3. `reduce` into an accumulator

```js
const unique = tags.reduce((acc, tag) => (acc.includes(tag) ? acc : [...acc, tag]), []);
```

Also O(n²), and it creates a new array on every step. Useful to show you understand `reduce`, but prefer `Set` in real code.

## 4. Objects: deduplicate by a key

`Set` compares objects by **reference**, so two objects with the same data are still "different":

```js
new Set([{ id: 1 }, { id: 1 }]).size; // 2
```

Use a `Map` keyed by the field that defines identity:

```js
const users = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ravi" },
  { id: 1, name: "Asha (duplicate)" },
];

// Keep the FIRST occurrence
const seen = new Set();
const firstWins = users.filter((u) => !seen.has(u.id) && seen.add(u.id));

// Keep the LAST occurrence (later entries overwrite earlier ones)
const lastWins = [...new Map(users.map((u) => [u.id, u])).values()];
```

## 5. Deduplicate by several fields

Build a composite key:

```js
const orders = [
  { userId: 1, productId: 10 },
  { userId: 1, productId: 10 },
  { userId: 1, productId: 11 },
];
const key = (o) => `${o.userId}|${o.productId}`;
const uniqueOrders = [...new Map(orders.map((o) => [key(o), o])).values()];
```

## 6. Case-insensitive / normalised dedupe

Normalise before comparing, but keep the original value:

```js
const emails = ["A@x.com", "a@x.com ", "b@x.com"];
const seenEmails = new Set();
const cleanEmails = emails.filter((e) => {
  const k = e.trim().toLowerCase();
  return !seenEmails.has(k) && seenEmails.add(k);
});
// ["A@x.com", "b@x.com"]
```

## Comparison

| Approach | Works for | Time | Keeps order |
|---|---|---|---|
| `[...new Set(arr)]` | primitives | O(n) | yes (first seen) |
| `filter` + `indexOf` | primitives | O(n²) | yes |
| `reduce` + `includes` | primitives | O(n²) | yes |
| `filter` + `Set` of keys | objects | O(n) | yes (first wins) |
| `new Map(arr.map(x => [key, x]))` | objects | O(n) | first position, **last value** wins |

## Gotchas

- `NaN`: `Set` treats `NaN` as equal to `NaN`, but `indexOf(NaN)` is always `-1`, so the `filter`/`indexOf` version **drops every `NaN`**.
- `0` and `-0` are treated as the same value by `Set`.
- None of these mutate the original array; they all return a new one.

## Interview tip

Start with `[...new Set(arr)]`, mention its O(n) cost, then show the `Map`-by-key version for arrays of objects. That covers 90% of follow-up questions.
