# with

`with()` is used for **replacing one array element**. It returns a **new updated array** with the value at the given index replaced, without mutating the original array. It is the non-mutating version of the bracket assignment `arr[index] = value`, and it makes React state updates like "toggle this todo" or "update this score" a one-liner.

## Syntax

```js
const newArray = array.with(index, value);
```

- `index`: position to replace. Negative counts from the end (`-1` is the last element).
- `value`: the new value at that index.
- **Returns**: a **new** array with that one element replaced.
- **Does not mutate** the original array.
- Throws `RangeError` if the index is out of range (it never adds elements).
- **Support**: ES2023. Node.js 20+, Chrome/Edge 110+, Firefox 115+, Safari 16+.

## 1. Basic usage

```js
const arrNum = [1, 3, 4, 4];
const updatedArr = arrNum.with(1, 300); // at index 1, replace old value with 300

updatedArr; // [1, 300, 4, 4]
arrNum;     // [1, 3, 4, 4]  (unchanged)
```

## 2. Negative index

```js
const scores = [10, 20, 30];
scores.with(-1, 99); // [10, 20, 99]
```

## 3. Out of range throws

```js
[1, 2, 3].with(5, 0);  // RangeError: Invalid index : 5
[1, 2, 3].with(-4, 0); // RangeError
```

Unlike `arr[5] = 0`, which silently grows the array and creates holes, `with` refuses.

## 4. Real-world example: toggle a todo in React

```jsx
const [todos, setTodos] = useState([
  { id: 1, text: "Buy milk", done: false },
  { id: 2, text: "Pay bills", done: false },
]);

function toggle(index) {
  setTodos((prev) => prev.with(index, { ...prev[index], done: !prev[index].done }));
}
```

`with` fits because you know the index and want to replace exactly one item. Note the `{ ...prev[index] }`: the object itself must also be new, since `with` only copies the array.

## 5. Real-world example: update one cell of a game board

```js
const board = ["X", null, "O", null, null, null, null, null, null];
const next = board.with(4, "X"); // player X plays the center

next[4];  // "X"
board[4]; // null  (previous board kept, so "undo" / time travel works)
```

It fits because keeping every previous board as its own array is what makes history and undo easy.

## 6. Real-world example: update a quantity in a cart

```js
const cart = [
  { id: 1, name: "Shoes", qty: 1 },
  { id: 2, name: "Watch", qty: 1 },
];

const i = cart.findIndex((item) => item.id === 2);
const updatedCart = i === -1 ? cart : cart.with(i, { ...cart[i], qty: cart[i].qty + 1 });

updatedCart[1].qty; // 2
cart[1].qty;        // 1
```

It fits because it replaces one item by position without a `map` over the whole list. Guard `-1`: `with(-1, ...)` would replace the **last** item.

## Gotchas

- `findIndex` returning `-1` plus `with(-1, x)` silently replaces the last element.
- Out-of-range index throws `RangeError`; `with` cannot append. Use `[...arr, x]` for that.
- The array copy is **shallow**: `arr.with(0, arr[0])` shares the same object. Spread the object (`{ ...obj, done: true }`) when changing a field.
- Sparse arrays: holes become `undefined` in the result.
- Works on typed arrays too.

## Comparison

| Way to change one element | Mutates? | Returns | Out-of-range index |
| --- | --- | --- | --- |
| `arr[i] = v` | Yes | `v` | Grows the array (creates holes) |
| `arr.with(i, v)` | No | New array | Throws `RangeError` |
| `arr.map((x, j) => j === i ? v : x)` | No | New array | No change |
| `arr.toSpliced(i, 1, v)` | No | New array | Appends at the end |
| `arr.splice(i, 1, v)` | Yes | Removed elements | Appends at the end |

## Interview questions

**1. What does `with` return, and does it change the original?**

<details>
<summary>Answer</summary>

It returns a new array with one index replaced. The original array is not changed.

</details>

**2. What happens with `[1, 2, 3].with(3, 4)`?**

<details>
<summary>Answer</summary>

It throws a `RangeError`, because valid indexes are 0 to 2 (or -3 to -1). `with` never adds elements.

</details>

**3. Toggle `done` for the todo at index `i` in React state.**

<details>
<summary>Answer</summary>

`setTodos(prev => prev.with(i, { ...prev[i], done: !prev[i].done }))`. Both the array and the changed object are new.

</details>

**4. How is `arr.with(i, v)` different from `arr.map((x, j) => j === i ? v : x)`?**

<details>
<summary>Answer</summary>

Same result for a valid index, but `with` is shorter, supports negative indexes, and throws on an out-of-range index, while `map` silently returns an unchanged copy.

</details>
