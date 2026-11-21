# keys

`keys()` returns an **iterator** that yields each **index** of the array (0, 1, 2, ...). It's handy when you only care about positions, and unlike `Object.keys(arr)` it includes the indexes of empty slots, which makes it a neat way to generate number ranges.

## Syntax

```js
array.keys()
```

- **Parameters:** none.
- **Returns:** a new Array Iterator object that yields numeric indexes.
- **Mutates:** no.

## 1. Loop over indexes

```js
const colors = ["red", "green", "blue"];

for (const i of colors.keys()) {
  console.log(i); // 0, 1, 2
}
```

## 2. Convert to an array

```js
console.log([...colors.keys()]);        // [0, 1, 2]
console.log(Array.from(colors.keys())); // [0, 1, 2]
```

## 3. Generate a range of numbers

```js
const range = [...Array(5).keys()];                       // [0, 1, 2, 3, 4]
const oneToFive = [...Array(5).keys()].map((n) => n + 1); // [1, 2, 3, 4, 5]
```

This works because `keys()` yields indexes even for empty slots.

## 4. `arr.keys()` vs `Object.keys(arr)`

```js
const sparse = ["a", , "c"];
console.log([...sparse.keys()]);  // [0, 1, 2]   numbers, holes included
console.log(Object.keys(sparse)); // ["0", "2"]  strings, holes skipped
```

## 5. Real-world: page numbers for pagination (React)

```jsx
function Pagination({ totalItems, pageSize, current, onChange }) {
  const pageCount = Math.ceil(totalItems / pageSize);
  return (
    <nav>
      {[...Array(pageCount).keys()].map((i) => (
        <button key={i} disabled={i + 1 === current} onClick={() => onChange(i + 1)}>
          {i + 1}
        </button>
      ))}
    </nav>
  );
}
```

## Gotchas

- Returns an iterator, not an array: no `.length`, and it is single-use.
- Indexes are **numbers**; `Object.keys(arr)` gives **strings**.
- `keys()` includes holes; `Object.keys` skips them.
- Extra non-index properties (`arr.foo = 1`) are ignored by `keys()` but included by `Object.keys`.

## Interview questions

**1. What does `[...Array(3).keys()]` return and why?**

<details>
<summary>Answer</summary>

`[0, 1, 2]`. `Array(3)` has 3 empty slots, but `keys()` yields every index from 0 to `length - 1` regardless of holes.

</details>

**2. What's the difference between `arr.keys()` and `Object.keys(arr)`?**

<details>
<summary>Answer</summary>

`arr.keys()` returns an iterator of numeric indexes and includes holes. `Object.keys(arr)` returns an array of string keys, skips holes, and includes any extra own enumerable properties.

</details>

**3. How would you create an array `[1, 2, ..., n]` in one line?**

<details>
<summary>Answer</summary>

`[...Array(n).keys()].map((i) => i + 1)` or `Array.from({ length: n }, (_, i) => i + 1)`.

</details>
