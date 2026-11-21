# findIndex

`findIndex()` searches an array based on a condition and returns the **index** of the first element that matches. If nothing is found it returns **`-1`**. Like `find`, it stops at the first match and **doesn't mutate** the array. Use it when you need the *position* of an item, usually so you can update or remove it (with `splice`, `with()`, `toSpliced()` or a spread copy).

## Syntax

```js
array.findIndex((element, index, array) => {
  // return true for the element you want
}, thisArg)
```

- `element`: the element being processed.
- `index` (optional): the index of the current element.
- `array` (optional): the array `findIndex` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** the index of the first element for which the callback returns truthy, or `-1`.
- **Mutates:** no.

## 1. Basic search

Indexes start at `0` and go up to `length - 1`.

```js
const users = [
  { id: 1, name: "Alice" },   // 0
  { id: 2, name: "Bob" },     // 1
  { id: 3, name: "Charlie" }, // 2
];

users.findIndex((user) => user.id === 3); // 2 (Charlie is at index 2, not 1)
users.findIndex((user) => user.id === 9); // -1
```

## 2. Always check for `-1`

`-1` is **truthy**, so `if (idx)` is a bug: it's true for "not found" and false for a match at index `0`.

```js
const idx = users.findIndex((u) => u.name === "Alice"); // 0
if (idx) { /* never runs, even though Alice was found */ }
if (idx !== -1) { /* correct */ }
```

## 3. Remove an item (mutating, with `splice`)

`findIndex` itself doesn't change anything, but its result is often passed to `splice`, which **does** mutate the original array.

```js
const cart = [
  { id: 1, item: "Apple" },
  { id: 2, item: "Banana" },
];
const i = cart.findIndex((p) => p.id === 2);
if (i !== -1) cart.splice(i, 1); // i: target index, 1: how many elements to remove
// cart is now [{ id: 1, item: "Apple" }]
```

## 4. `findIndex` vs `indexOf`

`indexOf` looks for an exact value; `findIndex` takes a condition, so it works with objects and can find `NaN`.

```js
[10, 20, 30].indexOf(20);               // 1
users.findIndex((u) => u.name === "Bob"); // 1
[NaN].indexOf(NaN);                     // -1
[NaN].findIndex(Number.isNaN);          // 0
```

## 5. Real-world: update an item in React state

To toggle a todo you need its position to replace it with an updated copy. `findIndex` gives you that position; `with()` returns a new array so state isn't mutated.

```js
function toggleTodo(todos, id) {
  const i = todos.findIndex((t) => t.id === id);
  if (i === -1) return todos;
  return todos.with(i, { ...todos[i], done: !todos[i].done });
}
// setTodos((todos) => toggleTodo(todos, 2));
```

## 6. Real-world: add to cart or increase quantity

If the product is already in the cart, bump its quantity; otherwise add it. `findIndex` answers both "is it there?" and "where?" in one pass.

```js
function addToCart(cart, product) {
  const i = cart.findIndex((item) => item.id === product.id);
  if (i === -1) return [...cart, { ...product, qty: 1 }];
  return cart.map((item, idx) => (idx === i ? { ...item, qty: item.qty + 1 } : item));
}
```

## 7. Real-world: keyboard navigation in a list

Find the index of the currently selected option so arrow keys can move to the next one.

```js
const options = [{ id: "a" }, { id: "b" }, { id: "c" }];
const current = options.findIndex((o) => o.id === "b"); // 1
const next = options[(current + 1) % options.length];   // { id: "c" }
```

## Gotchas

- Not found is **`-1`**, not `undefined`. Compare with `!== -1`; never use the result as a boolean.
- Using the index with `splice` mutates the original array. In React state, use `with()`, `toSpliced()`, `map` or `filter` instead.
- Like `find`, it visits holes in sparse arrays (as `undefined`).
- `arr[-1]` is `undefined` (not the last element), so using `-1` as an index without checking silently does nothing useful; `arr.at(-1)` *would* return the last element, which is worse.
- Need the last match? Use `findLastIndex()`.

## Comparison

| Method | Returns | When nothing matches | Takes a callback |
|---|---|---|---|
| `findIndex` | index of first match | `-1` | yes |
| `findLastIndex` | index of last match | `-1` | yes |
| `find` | first matching element | `undefined` | yes |
| `indexOf` | index of exact value | `-1` | no |
| `includes` | boolean for exact value | `false` | no |

## Interview questions

**1. What does `findIndex` return when nothing matches, and why is `if (idx)` wrong?**

<details>
<summary>Answer</summary>

It returns `-1`. `-1` is truthy and `0` (a valid match at the first position) is falsy, so `if (idx)` gets both cases wrong. Use `if (idx !== -1)`.

</details>

**2. `findIndex` vs `indexOf`?**

<details>
<summary>Answer</summary>

`indexOf(value)` compares each element with `===` against a value. `findIndex(fn)` runs a callback, so it can match objects by a property or use any condition. `indexOf` can't find `NaN`; `findIndex(Number.isNaN)` can.

</details>

**3. How do you remove an item by id without mutating the array?**

<details>
<summary>Answer</summary>

Either `arr.filter(x => x.id !== id)`, or find the index and use `toSpliced`:

```js
const i = arr.findIndex((x) => x.id === id);
const next = i === -1 ? arr : arr.toSpliced(i, 1);
```

</details>

**4. Implement your own `findIndex` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myFindIndex = function (cb, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) return i;
  }
  return -1;
};
```

</details>
