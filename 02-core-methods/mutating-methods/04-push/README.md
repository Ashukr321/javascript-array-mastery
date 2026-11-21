# push

`push()` adds one or more elements to the **end** of an array and returns the **new length** of the array. It is the most common way to grow an array: collecting results in a loop, adding a log entry, pushing onto a stack, adding a product to a cart.

## Syntax

```js
const newLength = array.push(item1, item2 /* , ... */);
```

- `item1, item2, ...`: elements to add at the end, in order.
- **Returns**: the **new length** of the array (a number), not the array.

> **Mutates the original array.** The non-mutating way is `[...arr, item]` or `arr.concat(item)`, which return a new array.

## 1. Basic usage

```js
const animals = ["pigs", "goats", "sheep"];
const count = animals.push("cows");

animals; // ["pigs", "goats", "sheep", "cows"]
count;   // 4
```

## 2. Push several elements at once

```js
const stack = [1, 2, 3];
const newLength = stack.push("hello", "world");

newLength; // 5
stack;     // [1, 2, 3, "hello", "world"]
```

To push all elements of another array, spread it: `arr.push(...other)`. Without the spread, the whole array is pushed as **one** nested element.

```js
const a = [1, 2];
a.push([3, 4]);  // [1, 2, [3, 4]]
a.push(...[5]);  // [1, 2, [3, 4], 5]
```

## 3. Stack (LIFO) with push and pop

```js
const history = [];
history.push("/home");
history.push("/products");
history.push("/cart");
history.pop(); // "/cart"  (go back)
history;       // ["/home", "/products"]
```

`push` and `pop` work at the end of the array, so they are **O(1)**: nothing else needs to move. `unshift`/`shift` work at the start and are O(n).

## 4. Real-world example: building a result list in a loop

```js
const orders = [
  { id: 1, total: 499 },
  { id: 2, total: 1299 },
  { id: 3, total: 2499 },
];

const bigOrderIds = [];
for (const order of orders) {
  if (order.total > 1000) bigOrderIds.push(order.id);
}
bigOrderIds; // [2, 3]
```

`push` fits because the array is a local variable you own: mutating it is safe and cheap. (`filter` + `map` would also work.)

## 5. Real-world example: an app log / job queue

```js
const logs = [];

function log(level, message) {
  logs.push({ level, message, time: new Date().toISOString() });
}

log("info", "User logged in");
log("error", "Payment failed");
logs.length; // 2

const queue = [];
queue.push("send-email", "resize-image"); // enqueue at the end
queue.shift();                            // "send-email"  (FIFO: take from the front)
```

`push` fits because logs and queues always grow at the end, in order of arrival.

## 6. Real-world example: add to cart in React

State must not be mutated, so do **not** `push` into it. Create a new array instead:

```js
// wrong: mutates state, React may not re-render
cart.push(product);
setCart(cart);

// right: new array with the product at the end
setCart((prev) => [...prev, product]);
```

React compares the old and new state by reference. After `push` it is still the same array, so React thinks nothing changed.

## Gotchas

- `push` returns the **new length**, not the array: `const arr2 = arr.push(4)` gives you a number. `arr = arr.push(x)` is a classic bug.
- `push` mutates even `const` arrays: `const` stops reassignment, not changes to the contents.
- Two variables pointing to the same array both see the push (`const copy = data; copy.push(7)` changes `data` too).
- `arr.push(otherArray)` nests the array; use `arr.push(...otherArray)`. For very large arrays (100k+ items) spreading into arguments can throw "Maximum call stack size exceeded"; use a loop or `concat`.

## Comparison

| Method | Where | Mutates? | Returns |
| --- | --- | --- | --- |
| `push(x)` | End | Yes | New length |
| `unshift(x)` | Start | Yes | New length |
| `pop()` | End | Yes | Removed element |
| `shift()` | Start | Yes | Removed element |
| `[...arr, x]` / `concat(x)` | End | No | New array |

## Interview questions

**1. What does `push` return?**

<details>
<summary>Answer</summary>

The new length of the array. `[1, 2].push(3)` returns `3`.

</details>

**2. Why shouldn't you use `push` on React state?**

<details>
<summary>Answer</summary>

It mutates the existing array, so the state reference stays the same and React can skip the re-render. Use `setItems(prev => [...prev, item])` to create a new array.

</details>

**3. What is the output? `const a = [1]; const b = a; b.push(2); console.log(a);`**

<details>
<summary>Answer</summary>

`[1, 2]`. `a` and `b` reference the same array, so the push is visible through both.

</details>

**4. What is the time complexity of `push` vs `unshift`?**

<details>
<summary>Answer</summary>

`push` is amortized O(1) because it adds at the end. `unshift` is O(n) because every existing element has to move one index to the right.

</details>
