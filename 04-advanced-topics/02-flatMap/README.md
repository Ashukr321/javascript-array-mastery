# flatMap

`flatMap()` is **`map` + `flat`**: it first transforms each element with a callback, then flattens the result by **exactly 1 level**. It's just like `map`, but your callback returns an array (and those arrays get merged into one). It's a non-mutating method and is a bit faster and cleaner than writing `arr.map(fn).flat()`.

## Syntax

```js
array.flatMap((currentValue, index, array) => {
  return valueOrArray;
}, thisArg)
```

- `currentValue`: the element being processed.
- `index` (optional): index of the current element.
- `array` (optional): the array `flatMap` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** a new array; each callback result is flattened one level into it.
- **Mutates:** no.

## 1. `map` vs `flatMap`

```js
const words = ["hi there", "good day"];
words.map((s) => s.split(" "));     // [["hi", "there"], ["good", "day"]]
words.flatMap((s) => s.split(" ")); // ["hi", "there", "good", "day"]
```

`arr.flatMap(fn)` is equivalent to `arr.map(fn).flat(1)`.

## 2. Array of objects: collect nested arrays

```js
const users = [
  { name: "Ashu", skills: ["js", "react"] },
  { name: "Rahul", skills: ["node"] },
];

const skills = users.flatMap((user) => user.skills);
// ["js", "react", "node"]
```

## 3. Filter and map in one pass

Return `[]` to drop an item, `[value]` to keep it:

```js
const nums = [1, 2, 3, 4, 5];
nums.flatMap((n) => (n % 2 === 0 ? [n * 10] : [])); // [20, 40]
```

## 4. One-to-many: produce several items per element

```js
const cart = [
  { item: "pen", qty: 2 },
  { item: "book", qty: 1 },
];
cart.flatMap((c) => Array(c.qty).fill(c.item)); // ["pen", "pen", "book"]
```

## 5. Only one level deep

```js
[1, 2].flatMap((n) => [[n, n * 2]]); // [[1, 2], [2, 4]]  inner arrays stay nested
[[1, [2]], [3]].flatMap((x) => x);   // [1, [2], 3]
```

For deeper flattening use `flat(depth)` or `flat(Infinity)`.

## 6. Real-world: render grouped API data (React)

```jsx
// API: [{ category: "Fruits", items: [{ id: 1, name: "Apple" }, ...] }, ...]
function ProductList({ groups }) {
  return (
    <ul>
      {groups.flatMap((g) => [
        <li key={`h-${g.category}`} className="heading">{g.category}</li>,
        ...g.items.map((p) => <li key={p.id}>{p.name}</li>),
      ])}
    </ul>
  );
}
```

And getting every unique tag across posts:

```js
const posts = [
  { id: 1, tags: ["js", "react"] },
  { id: 2, tags: ["react", "css"] },
];
const allTags = [...new Set(posts.flatMap((p) => p.tags))]; // ["js", "react", "css"]
```

## Gotchas

- Flattens **only 1 level**; there is no depth argument (unlike `flat`).
- Non-array return values are kept as-is: `[1, 2].flatMap((n) => n * 2)` is `[2, 4]`, same as `map`.
- Returning `undefined` (e.g. forgetting `return` with braces) puts `undefined` in the result; return `[]` to skip an item.
- Array-like objects (e.g. strings) are **not** flattened: `["ab"].flatMap((s) => s)` is `["ab"]`.
- It's a shallow copy: objects in the result are the same references as in the original.

## Interview questions

**1. What is the difference between `map().flat()` and `flatMap()`?**

<details>
<summary>Answer</summary>

The result is the same as `map(fn).flat(1)`, but `flatMap` does it in one pass without creating the intermediate array, and it can only flatten 1 level.

</details>

**2. What does `[1, 2, 3].flatMap((n) => [[n]])` return?**

<details>
<summary>Answer</summary>

`[[1], [2], [3]]`. Each callback returns `[[n]]`, and `flatMap` removes only the outer level.

</details>

**3. How can you filter and map at the same time with `flatMap`?**

<details>
<summary>Answer</summary>

Return an empty array for items you want to drop and a one-item array for items you want to keep (transformed): `arr.flatMap((x) => (keep(x) ? [transform(x)] : []))`.

</details>

**4. Does `flatMap` mutate the original array?**

<details>
<summary>Answer</summary>

No. It returns a new array and leaves the original unchanged.

</details>
