# map

`map()` **transforms each element** of an array and returns a **newly created array** of the same length with the results. It's a **higher-order function**: it takes a callback, calls it for every element, and puts whatever the callback returns into the new array at the same position. It **does not mutate** the original array, which is why it's so widely used in React applications, most of all for turning data into a list of JSX elements.

## Syntax

```js
array.map((element, index, array) => {
  return newValue;
}, thisArg)
```

- `element`: the element being processed.
- `index` (optional): the index of the current element.
- `array` (optional): the array `map` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** a new array, same length as the original, filled with the callback's return values.
- **Mutates:** no.

## 1. Basic transform

```js
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map((n) => n * n);              // [1, 4, 9, 16, 25]
const strings = numbers.map((n) => `Number is: ${n}`);  // ["Number is: 1", ...]
console.log(numbers); // [1, 2, 3, 4, 5]  original unchanged
```

## 2. Array of objects

Pick a field, or return a new object. Wrap an object literal in parentheses when using an arrow function's implicit return.

```js
const users = [
  { id: 1, first: "Ashutosh", last: "Kumar" },
  { id: 2, first: "Amit", last: "Singh" },
];
users.map((u) => u.first);                                  // ["Ashutosh", "Amit"]
users.map((u) => ({ id: u.id, fullName: `${u.first} ${u.last}` }));
// [{ id: 1, fullName: "Ashutosh Kumar" }, { id: 2, fullName: "Amit Singh" }]
```

## 3. Using `index`

```js
["a", "b", "c"].map((letter, i) => `${i + 1}. ${letter}`); // ["1. a", "2. b", "3. c"]
```

## 4. Real-world: rendering a list in React

`map` turns an array of data into an array of elements, and React renders arrays directly. Each item needs a stable, unique `key` (an id from the data, not the index if the list can reorder) so React can track which item is which.

```jsx
function ProductList({ products }) {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name}: ₹{p.price}
        </li>
      ))}
    </ul>
  );
}
```

## 5. Real-world: shaping an API response

APIs often return more (or differently named) fields than the UI needs. `map` reshapes every record in one pass without touching the original response.

```js
const apiUsers = [
  { user_id: 7, full_name: "Alice", is_active: 1 },
  { user_id: 8, full_name: "Bob", is_active: 0 },
];
const users = apiUsers.map((u) => ({ id: u.user_id, name: u.full_name, active: Boolean(u.is_active) }));
```

## 6. Real-world: updating one item in state

To change one item immutably, map over the list and return a new object for the matching item, the same object for the rest.

```js
const todos = [{ id: 1, done: false }, { id: 2, done: false }];
const next = todos.map((t) => (t.id === 2 ? { ...t, done: true } : t));
```

## 7. Real-world: parallel async requests

`map` returns an array of promises, which `Promise.all` waits for together.

```js
const ids = [1, 2, 3];
// const users = await Promise.all(ids.map((id) => fetch(`/api/users/${id}`).then((r) => r.json())));
```

## Gotchas

- **Forgetting `return` gives `undefined`.** `nums.map((n) => { n * 2 })` returns `[undefined, undefined, ...]`. Either add `return` or drop the braces.
- Returning an object literal with an implicit return needs parentheses: `(u) => ({ id: u.id })`, not `(u) => { id: u.id }`.
- **`["1", "2", "3"].map(parseInt)` is `[1, NaN, NaN]`**, because `map` passes `(element, index)` and `parseInt` reads the index as the radix. Use `.map(Number)` or `.map((s) => parseInt(s, 10))`.
- The result always has the **same length**. To drop items, use `filter` (or `flatMap` returning `[]`).
- Don't use `map` just to loop; if you ignore the returned array, use `forEach`.
- It's a shallow copy: if the callback mutates `u.name = ...` it changes the original objects. Return new objects instead.
- Holes in sparse arrays are kept as holes in the result (the callback isn't called for them).

## Comparison

| Method | Returns | Length of result | Use for |
|---|---|---|---|
| `map` | new array | same as original | transforming every element |
| `forEach` | `undefined` | n/a | side effects |
| `filter` | new array | same or shorter | keeping some elements |
| `flatMap` | new array, flattened one level | any | map + flatten, or map + drop |
| `reduce` | any single value | n/a | combining into one value |

## Interview questions

**1. What's the difference between `map` and `forEach`?**

<details>
<summary>Answer</summary>

`map` returns a new array built from the callback's return values and can be chained. `forEach` returns `undefined` and is only for side effects. Neither can be stopped early with `break`.

</details>

**2. What does `["1", "2", "3"].map(parseInt)` return?**

<details>
<summary>Answer</summary>

`[1, NaN, NaN]`. `map` calls `parseInt("1", 0)`, `parseInt("2", 1)`, `parseInt("3", 2)`. Radix 0 means "auto" (10), radix 1 is invalid, and "3" isn't a valid base-2 digit.

</details>

**3. Why does React need a `key` when you `map` a list?**

<details>
<summary>Answer</summary>

The key tells React which element is which between renders, so it can reuse, move or remove the right DOM nodes and keep component state attached to the right item. Use a stable unique id; the index breaks when items are inserted, removed or reordered.

</details>

**4. Implement your own `map` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myMap = function (cb, thisArg) {
  if (typeof cb !== "function") throw new TypeError(cb + " is not a function");
  const result = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) result[i] = cb.call(thisArg, this[i], i, this);
  }
  return result;
};
```

`new Array(length)` plus the `i in this` check keeps holes as holes, like the real `map`.

</details>
