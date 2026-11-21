# reduce

`reduce()` boils a whole array down to a **single value**. The classic example is a sum, but the "single value" can be anything: a number, a string, an object, a `Map`, or another array. It walks the array from left to right and keeps a running result in the **accumulator**; whatever the callback returns becomes the accumulator for the next element, and the final accumulator is the result. It **doesn't mutate** the array. Use it for totals, counts, grouping, and building lookup objects from lists.

## Syntax

```js
array.reduce((accumulator, currentElement, index, array) => {
  // logic
  return newAccumulator;
}, initialValue)
```

- `accumulator`: the value returned by the previous callback call (or `initialValue` on the first call). The result is stored here as you go.
- `currentElement`: the element being processed.
- `index` (optional): the index of `currentElement`.
- `array` (optional): the array `reduce` was called on.
- `initialValue` (optional but recommended): the starting accumulator. If omitted, the **first** element is used and iteration starts at index 1.
- **Returns:** the final accumulator.
- **Mutates:** no.

## 1. Sum

```js
const numArr = [1, 2, 3, 4, 5];
const sum = numArr.reduce((acc, curr) => acc + curr, 0); // 15
```

The callback must **return** the new accumulator. With braces and no `return`, the next accumulator is `undefined`:

```js
numArr.reduce((acc, curr) => { acc + curr; }, 0); // undefined
```

(`return acc = acc + curr` works, but the assignment is unnecessary; `return acc + curr` is enough.)

## 2. Step by step

```js
[1, 2, 3].reduce((acc, curr) => {
  console.log(acc, curr);
  return acc + curr;
}, 0);
// 0 1
// 1 2
// 3 3
// result: 6
```

## 3. Max value, and flattening

```js
[4, 9, 2].reduce((max, n) => (n > max ? n : max), -Infinity); // 9

// flatten one level
[[1, 2], [3, 4], [5]].reduce((acc, curr) => acc.concat(curr), []); // [1, 2, 3, 4, 5]

// flatten deeply: the function must call itself by its own name
const flatten = (arr) =>
  arr.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
flatten([[1, 2], [3, 4], [5, [6]]]); // [1, 2, 3, 4, 5, 6]
```

Calling `flatMap(curr)` inside the callback instead would throw `ReferenceError: flatMap is not defined`: `flatMap` is an array method (`curr.flatMap(...)`), not a global function, and it only flattens one level anyway. In practice, `arr.flat(Infinity)` does deep flattening for you.

## 4. Real-world: cart total

Many items, one number: exactly what `reduce` is for. Always start from `0` so an empty cart gives `0` instead of throwing.

```js
const cart = [
  { name: "Shoes", price: 2000, qty: 1 },
  { name: "Socks", price: 150, qty: 3 },
];
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0); // 2450
```

## 5. Real-world: counting (frequency map)

Count orders per status for a dashboard. The accumulator is an object that grows as you go.

```js
const orders = [{ status: "paid" }, { status: "pending" }, { status: "paid" }];
const counts = orders.reduce((acc, o) => {
  acc[o.status] = (acc[o.status] || 0) + 1;
  return acc;
}, {});
// { paid: 2, pending: 1 }
```

## 6. Real-world: groupBy

Group products by category to render sections. `reduce` builds the whole structure in one pass. (Modern runtimes also have `Object.groupBy(products, (p) => p.category)`.)

```js
const products = [
  { name: "Laptop", category: "tech" },
  { name: "Shirt", category: "clothes" },
  { name: "Phone", category: "tech" },
];
const byCategory = products.reduce((acc, p) => {
  (acc[p.category] ||= []).push(p);
  return acc;
}, {});
// { tech: [Laptop, Phone], clothes: [Shirt] }
```

## 7. Real-world: lookup object by id

Turn an API list into `{ [id]: user }` so later lookups are instant instead of calling `find` each time.

```js
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const usersById = users.reduce((acc, u) => ({ ...acc, [u.id]: u }), {});
usersById[2].name; // "Bob"
```

(Spreading `acc` every step copies the object each time, which is O(n²) for big lists; mutating `acc[u.id] = u; return acc;` is fine because `acc` is your own fresh object.)

## Gotchas

- **Empty array without `initialValue` throws** `TypeError: Reduce of empty array with no initial value`. Always pass an initial value.
- Without `initialValue`, the first element becomes the accumulator, which breaks when elements are objects: `cart.reduce((s, i) => s + i.price)` starts with an object, giving `"[object Object]150"`.
- **Forgetting to `return`** the accumulator makes it `undefined` on the next step.
- A one-element array with no initial value returns that element without calling the callback.
- Holes in sparse arrays are skipped.
- If it reads badly, a `for...of` loop or `map`/`filter` may be clearer. `reduce` is powerful, not mandatory.

## Comparison

| Method | Direction | Returns | Use for |
|---|---|---|---|
| `reduce` | left to right | any single value | totals, counts, groupBy, lookups |
| `reduceRight` | right to left | any single value | compose, building from the inside out |
| `map` | left to right | array, same length | transforming each element |
| `filter` | left to right | array, same or shorter | keeping some elements |
| `forEach` | left to right | `undefined` | side effects |

## Interview questions

**1. What happens if you call `reduce` on an empty array without an initial value?**

<details>
<summary>Answer</summary>

It throws `TypeError: Reduce of empty array with no initial value`. With an initial value, it returns the initial value without calling the callback.

</details>

**2. Implement `map` and `filter` using `reduce`.**

<details>
<summary>Answer</summary>

```js
const map = (arr, fn) => arr.reduce((acc, x, i) => (acc.push(fn(x, i, arr)), acc), []);
const filter = (arr, fn) => arr.reduce((acc, x, i) => (fn(x, i, arr) && acc.push(x), acc), []);
```

</details>

**3. Write a `pipe` function using `reduce`.**

<details>
<summary>Answer</summary>

```js
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
pipe((n) => n + 1, (n) => n * 2)(5); // 12
```

`compose` is the same with `reduceRight`.

</details>

**4. Implement your own `reduce` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myReduce = function (cb, ...rest) {
  let i = 0;
  let acc;
  if (rest.length > 0) {
    acc = rest[0];
  } else {
    while (i < this.length && !(i in this)) i++; // skip leading holes
    if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
    acc = this[i++];
  }
  for (; i < this.length; i++) {
    if (i in this) acc = cb(acc, this[i], i, this);
  }
  return acc;
};
```

`...rest` is used so that an explicit `undefined` initial value still counts as "provided".

</details>
