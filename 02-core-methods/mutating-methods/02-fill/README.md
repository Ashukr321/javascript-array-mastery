# fill

`fill()` overwrites every element in a range of an array with one static value. It is the quickest way to create a pre-sized array of defaults (`new Array(5).fill(0)`), reset a range of slots, or build placeholder data such as skeleton rows. It is widely used in React for exactly that.

## Syntax

```js
array.fill(value, startIndex, endIndex);
```

- `value`: the value to write into every slot.
- `startIndex` (optional, default `0`): where to start. Negative counts from the end.
- `endIndex` (optional, default `array.length`): where to stop. **`endIndex` is excluded**, so `fill(0, 1, 3)` writes to indexes 1 and 2 only.
- **Returns**: the same (modified) array, not a copy.

> **Mutates the original array.** `fill` does not change the length; it only overwrites existing slots. For an immutable update of one index use `arr.with(index, value)`; for a filled copy use `[...arr].fill(value)` or `Array.from({ length: n }, () => value)`.

## 1. Basic usage

```js
const num = [1, 2, 3, 4];

num.fill(12, 0);            // start at 0, go to the end
// [12, 12, 12, 12]

[1, 2, 3, 4].fill(0, 1, 3); // indexes 1 and 2 (3 is excluded)
// [1, 0, 0, 4]

[1, 2, 3, 4].fill(9, -2);   // last two slots
// [1, 2, 9, 9]
```

## 2. Creating a pre-sized array

```js
const arrNUM = new Array(5).fill(14);
// [14, 14, 14, 14, 14]

const board = new Array(9).fill(null); // tic-tac-toe board
```

`new Array(5)` alone gives 5 *empty* slots, which `map` skips. Calling `fill` first makes the slots real so you can chain `map` after it:

```js
new Array(3).map((_, i) => i);         // [ <3 empty items> ]
new Array(3).fill(0).map((_, i) => i); // [0, 1, 2]
```

## 3. Real-world example: skeleton loaders in React

Render N placeholder rows while data loads:

```jsx
function UserListSkeleton() {
  return (
    <ul>
      {Array(5).fill(null).map((_, i) => (
        <li key={i} className="skeleton-row" />
      ))}
    </ul>
  );
}
```

To update state, never `fill` the state array in place. Copy first:

```js
setSeats((prev) => [...prev].fill(false)); // reset all seats immutably
```

## Gotchas

- **Objects are shared, not copied.** `fill` puts the *same reference* in every slot:

  ```js
  const grid = new Array(3).fill([]);
  grid[0].push("x");
  // [["x"], ["x"], ["x"]]  every row is the same array!
  ```

  Use `Array.from` with a factory so each slot gets its own object:

  ```js
  const grid = Array.from({ length: 3 }, () => []);
  ```

- `endIndex` is exclusive, the same as `slice`.
- `fill` never grows the array: `[].fill(1)` is still `[]`.

## Interview questions

**1. What does `new Array(3).fill([])` produce, and what goes wrong?**

<details>
<summary>Answer</summary>

Three slots that all point to the **same** array. Pushing into one row shows up in every row. Use `Array.from({ length: 3 }, () => [])` to get three separate arrays.

</details>

**2. Does `fill` return a new array?**

<details>
<summary>Answer</summary>

No. It mutates the array and returns the same reference, so `arr.fill(0) === arr` is `true`.

</details>

**3. What is the output of `[1, 2, 3, 4, 5].fill(0, 1, 3)`?**

<details>
<summary>Answer</summary>

`[1, 0, 0, 4, 5]`. Indexes 1 and 2 are filled; the end index 3 is excluded.

</details>

**4. Why does `new Array(3).map((_, i) => i)` not work, but `new Array(3).fill().map(...)` does?**

<details>
<summary>Answer</summary>

`new Array(3)` creates a sparse array with empty slots, and `map` skips empty slots. `fill()` (even with `undefined`) turns them into real slots, so `map` visits each one.

</details>
