# reduceRight

`reduceRight()` works exactly like `reduce()`, but walks the array from the **last element to the first** (right to left). It boils an array down to a single value (a number, string, object or another array). Use it when the order of combining matters: composing functions, building nested structures from the inside out, or processing items in reverse without copying and reversing the array first.

## Syntax

```js
array.reduceRight((accumulator, currentValue, index, array) => {
  return newAccumulator;
}, initialValue)
```

- `accumulator`: the value returned by the previous callback call (or `initialValue` on the first call).
- `currentValue`: the element being processed (starting from the end).
- `index` (optional): index of `currentValue`; it counts **down**.
- `array` (optional): the array `reduceRight` was called on.
- `initialValue` (optional): starting accumulator. If omitted, the **last** element is used and iteration starts at the second-to-last.
- **Returns:** the final accumulator value.
- **Mutates:** no.

## 1. Order compared with `reduce`

```js
const letters = ["a", "b", "c"];
letters.reduce((acc, x) => acc + x, "");      // "abc"
letters.reduceRight((acc, x) => acc + x, ""); // "cba"
```

For order-independent operations like sum, the result is the same either way:

```js
[1, 2, 3].reduceRight((acc, n) => acc + n, 0); // 6
```

## 2. Watching the index count down

```js
[10, 20, 30].reduceRight((acc, val, i) => {
  console.log(i, val); // 2 30, then 1 20, then 0 10
  return acc + val;
}, 0);
```

## 3. Function composition

`compose(f, g, h)(x)` means `f(g(h(x)))`: the rightmost function runs first, a natural fit for `reduceRight`.

```js
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const add1 = (n) => n + 1;
const double = (n) => n * 2;
compose(add1, double)(5); // add1(double(5)) = 11
```

## 4. Build nested structures from the inside out

```js
// Turn ["a", "b", "c"] into { a: { b: { c: {} } } }
const path = ["a", "b", "c"];
const nested = path.reduceRight((acc, key) => ({ [key]: acc }), {});
// { a: { b: { c: {} } } }
```

## 5. Real-world: middleware pipeline / React providers

Wrapping a React tree in several context providers, where the first in the list should be the outermost:

```jsx
const providers = [ThemeProvider, AuthProvider, QueryProvider];

function AppProviders({ children }) {
  return providers.reduceRight((tree, Provider) => <Provider>{tree}</Provider>, children);
}
// <ThemeProvider><AuthProvider><QueryProvider>{children}</QueryProvider></AuthProvider></ThemeProvider>
```

And building a "latest first" activity feed from an API response sorted oldest-first:

```js
const events = [
  { id: 1, text: "signed up" },
  { id: 2, text: "added card" },
  { id: 3, text: "placed order" },
];
const feed = events.reduceRight((acc, e) => [...acc, e.text], []);
// ["placed order", "added card", "signed up"]
```

## Gotchas

- An **empty array with no `initialValue` throws** `TypeError: Reduce of empty array with no initial value`. Always pass an initial value.
- Without `initialValue`, the callback runs `length - 1` times and the first accumulator is the last element.
- The callback must `return` the accumulator; forgetting it makes the accumulator `undefined`.
- Holes in sparse arrays are skipped.
- To simply reverse, `toReversed()` (non-mutating) is clearer than `reduceRight`.

## Interview questions

**1. What is the difference between `reduce` and `reduceRight`?**

<details>
<summary>Answer</summary>

Only the direction. `reduce` goes from index 0 to the end, `reduceRight` from the last index to 0. Without an initial value, `reduce` starts with the first element as the accumulator and `reduceRight` starts with the last.

</details>

**2. What does `[].reduceRight((a, b) => a + b)` do?**

<details>
<summary>Answer</summary>

It throws `TypeError: Reduce of empty array with no initial value`. With an initial value, such as `[].reduceRight((a, b) => a + b, 0)`, it returns `0` without calling the callback.

</details>

**3. Implement `compose(...fns)` using `reduceRight`.**

<details>
<summary>Answer</summary>

```js
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
```

`pipe` is the same with `reduce`, running functions left to right.

</details>

**4. Does `reduceRight` mutate the array?**

<details>
<summary>Answer</summary>

No. It only reads the array and returns the accumulated value. (Your callback could still mutate it, but that's bad practice.)

</details>
