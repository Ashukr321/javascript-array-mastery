# every

`every()` checks whether **all** elements of an array pass a test and returns a single boolean. It's a higher-order function: you pass it a callback, it runs that callback for each element, and returns `true` only if the callback returns a truthy value for every one of them. As soon as one element fails, it returns `false` and **stops checking** the rest. It **doesn't mutate** the original array. Reach for it whenever the question is "are they all...?": are all form fields filled, are all items in stock, does the user have all required permissions.

## Syntax

```js
array.every((element, index, array) => {
  // return true if this element passes
}, thisArg)
```

- `element`: the element being processed.
- `index` (optional): the index of the current element.
- `array` (optional): the array `every` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** `true` if the callback returned truthy for every element, otherwise `false`.
- **Mutates:** no.

## 1. Basic check

```js
const arrNum = [20, 30, 40, 50, 60];
const isAdult = arrNum.every((el) => el > 18); // true

[20, 15, 40].every((el) => el > 18); // false (15 fails)
```

## 2. It stops at the first failure

```js
[5, 1, 8, 9].every((n) => {
  console.log("checking", n);
  return n > 2;
});
// checking 5
// checking 1   <- fails, returns false, 8 and 9 are never checked
```

## 3. Empty arrays return `true`

You *can* call `every` on an empty array; it returns `true` without calling the callback. In logic this is called "vacuous truth": there is no element that fails the test.

```js
[].every((n) => n > 100); // true
```

This matters when the array comes from an API: "all items shipped?" on an empty order would say `true`, so guard with a length check if that's wrong for your case.

```js
const allShipped = items.length > 0 && items.every((i) => i.shipped);
```

## 4. Using `index` and `array`

```js
// is the array sorted ascending?
const isSorted = (arr) => arr.every((n, i, a) => i === 0 || a[i - 1] <= n);
isSorted([1, 2, 2, 5]); // true
isSorted([3, 1, 2]);    // false
```

## 5. Real-world: form validation

Enable the submit button only when every required field is filled. `every` fits because one empty field is enough to block the submit.

```jsx
const form = { name: "Ashutosh", email: "a@b.com", password: "" };
const required = ["name", "email", "password"];

const isValid = required.every((key) => form[key].trim() !== ""); // false

<button disabled={!isValid}>Sign up</button>
```

## 6. Real-world: permission checks

A route needs several permissions; the user must have **all** of them. `every` reads exactly like the rule.

```js
const userPermissions = ["read", "write", "delete"];
const canManagePosts = ["read", "write"].every((p) => userPermissions.includes(p)); // true
```

## 7. Real-world: checkout guard

Only allow checkout when every cart item is in stock and has a valid quantity.

```js
const cart = [
  { name: "Shoes", qty: 1, inStock: true },
  { name: "Shirt", qty: 2, inStock: true },
];
const canCheckout = cart.length > 0 && cart.every((i) => i.inStock && i.qty > 0); // true
```

## Gotchas

- `[].every(...)` is **`true`**, not an error. (A common belief is that you "can't use it on an empty array"; you can, it just returns `true`.)
- The callback must **return** a value. With braces and no `return` it returns `undefined` (falsy), so `every` gives `false`.
- Truthy/falsy, not strict booleans: `[1, 2, 0].every((n) => n)` is `false` because `0` is falsy.
- Holes in sparse arrays are skipped: `[1, , 3].every((n) => n > 0)` is `true`.
- `every` short-circuits, so don't rely on the callback running for every element (no side effects in it).

## Comparison

| Method | Question it answers | Returns | Stops early | Empty array |
|---|---|---|---|---|
| `every` | Do **all** pass? | boolean | on first `false` | `true` |
| `some` | Does **at least one** pass? | boolean | on first `true` | `false` |
| `filter` | Which ones pass? | new array | never | `[]` |
| `find` | Which is the first that passes? | element or `undefined` | on first match | `undefined` |

## Interview questions

**1. What does `[].every(x => x > 10)` return, and why?**

<details>
<summary>Answer</summary>

`true`. There is no element that fails the test (vacuous truth), so the callback is never called and `every` returns `true`. `some` on an empty array returns `false` for the same reason.

</details>

**2. How can you express `every` using `some`?**

<details>
<summary>Answer</summary>

All elements pass if no element fails: `arr.every(fn)` is the same as `!arr.some((x, i, a) => !fn(x, i, a))`.

</details>

**3. Does `every` check all elements?**

<details>
<summary>Answer</summary>

Not necessarily. It stops at the first element for which the callback returns a falsy value and returns `false` immediately. It only visits every element when they all pass.

</details>

**4. Implement your own `every` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myEvery = function (cb, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && !cb.call(thisArg, this[i], i, this)) return false;
  }
  return true;
};
```

</details>
