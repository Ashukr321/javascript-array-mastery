# forEach

`forEach()` simply **loops over an array**, calling a callback once for each element, just like a `for` loop. It doesn't create a new array and it **always returns `undefined`**. The method itself doesn't change the array, but your callback *can* (for example by assigning `arr[i] = ...`), so "non-mutating" only describes `forEach` itself. Use it for **side effects**: logging, updating the DOM, sending analytics, writing into an object or `Map`. If you want a transformed array, use `map` instead.

## Syntax

```js
array.forEach((element, index, array) => {
  // do something with element
}, thisArg)
```

- `element`: the element being processed.
- `index` (optional): the index of the current element.
- `array` (optional): the array `forEach` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** `undefined`, always.
- **Mutates:** not by itself, but the callback can mutate the array or its objects.

## 1. How it works internally

It goes element by element over the whole array, roughly like this:

```js
for (let i = 0; i < arr.length; i++) {
  if (i in arr) callback(arr[i], i, arr); // holes are skipped
}
```

(The real implementation reads the length once, before the loop starts, so elements pushed during the loop aren't visited.)

## 2. Basic loop

```js
const fruits = ["apple", "banana", "mango"];
fruits.forEach((fruit, i) => console.log(i, fruit));
// 0 apple
// 1 banana
// 2 mango
```

## 3. Mutating inside the callback

You can change the original array through the `array`/outer variable and index. It works, but it's usually clearer to create a new array with `map`.

```js
let arr = [1, 2, 3];
arr.forEach((el, i) => { arr[i] = el * 4; });
console.log(arr); // [4, 8, 12]  original changed

const arr2 = [1, 2, 3].map((el) => el * 4); // [4, 8, 12]  new array, preferred
```

## 4. It returns `undefined`, so you can't chain it

```js
const result = [1, 2, 3].forEach((n) => n * 2);
console.log(result); // undefined
// [1, 2, 3].forEach(...).filter(...)  -> TypeError
```

## 5. Real-world: logging and analytics

Fire one tracking event per item shown. Nothing needs to be returned, so `forEach` is the honest choice.

```js
const impressions = [{ id: "p1" }, { id: "p2" }];
impressions.forEach((p) => console.log("track impression", p.id));
```

## 6. Real-world: DOM updates

Update many elements at once, e.g. clear all "active" classes on tabs. This is a pure side effect.

```js
document.querySelectorAll(".tab").forEach((tab) => {
  tab.classList.remove("active");
});
```

(`NodeList` has its own `forEach`, so this works without converting to an array.)

## 7. Real-world: filling a lookup object or `Map`

Index API data by id for quick access later. The output lives outside the loop, which is fine for `forEach` (a `reduce` would also work).

```js
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const byId = {};
users.forEach((u) => { byId[u.id] = u; });
// { 1: { id: 1, name: "Alice" }, 2: { id: 2, name: "Bob" } }
```

## Gotchas

- **You can't `break` or `continue`.** `return` inside the callback only skips to the next element. To stop early, use a `for...of` loop, `some`, `every`, or `find`.
- **It doesn't wait for `async` callbacks.** `arr.forEach(async (x) => await save(x))` fires all calls and moves on immediately; the code after it runs before they finish and errors aren't caught by an outer `try`. Use `for...of` with `await` (one by one) or `await Promise.all(arr.map(...))` (in parallel).
- It always returns `undefined`, so `const x = arr.forEach(...)` is a mistake and it can't be chained.
- Holes in sparse arrays are skipped.
- Using `forEach` + `push` to build a new array is a sign you want `map` or `filter`.

## Comparison

| | `forEach` | `map` | `for...of` | `for` |
|---|---|---|---|---|
| Returns | `undefined` | new array | n/a | n/a |
| `break` / `continue` | no | no | yes | yes |
| Works with `await` | no | with `Promise.all` | yes | yes |
| Gives the index | yes | yes | with `.entries()` | yes |
| Best for | side effects | transforming | loops you may stop, async | full control |

## Interview questions

**1. What does `forEach` return?**

<details>
<summary>Answer</summary>

Always `undefined`. That's why it can't be chained and why it's meant for side effects, not for producing values.

</details>

**2. How do you break out of a `forEach`?**

<details>
<summary>Answer</summary>

You can't (short of throwing an exception, which is a hack). `return` only skips the current element. Use `for...of` with `break`, or `some`/`every`/`find`, which stop on their own.

</details>

**3. What's wrong with this code?**

```js
async function saveAll(items) {
  items.forEach(async (item) => await api.save(item));
  console.log("all saved");
}
```

<details>
<summary>Answer</summary>

`forEach` ignores the promises the async callback returns, so "all saved" is logged before anything is saved, and rejections are unhandled. Fix with `await Promise.all(items.map((item) => api.save(item)))` or a `for...of` loop with `await`.

</details>

**4. Implement your own `forEach` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myForEach = function (cb, thisArg) {
  const len = this.length;
  for (let i = 0; i < len; i++) {
    if (i in this) cb.call(thisArg, this[i], i, this);
  }
};
```

</details>
