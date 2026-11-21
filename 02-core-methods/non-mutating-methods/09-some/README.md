# some

`some()` is one of the most widely used array methods. It checks whether **at least one** element passes a test and returns a boolean. It works like `every`, but the other way round: `every` needs all elements to pass, while `some` returns `true` as soon as **one** element passes, and it doesn't check the remaining elements (it stops early). If no element passes, it returns `false`. It **doesn't mutate** the original array. Use it for "is there any...?" questions: any error in the form, any admin role, any item out of stock.

## Syntax

```js
array.some((element, index, array) => {
  // return true if this element passes
}, thisArg)
```

- `element`: the element being processed.
- `index` (optional): the index of the current element.
- `array` (optional): the array `some` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** `true` if the callback returned truthy for at least one element, otherwise `false`.
- **Mutates:** no.

## 1. Basic check

```js
const arrNum = [1, 2, 3, 4, 5, 6];
arrNum.some((el) => el % 2 === 0); // true (2 is even)
[1, 3, 5].some((el) => el % 2 === 0); // false
```

## 2. It stops at the first match

```js
[1, 2, 3, 4].some((n) => {
  console.log("checking", n);
  return n % 2 === 0;
});
// checking 1
// checking 2   <- passes, returns true, 3 and 4 are never checked
```

Note that `every` also stops early, just on the opposite condition: `every` stops at the first **failure**, `some` stops at the first **success**.

## 3. Empty arrays return `false`

```js
[].some((n) => n > 0); // false, there is no element that passes
```

## 4. `some` vs `includes`

`includes` checks for one exact value (using SameValueZero). `some` takes a condition, so it works with objects and custom rules.

```js
[1, 2, 3].includes(2); // true
const users = [{ id: 1 }, { id: 2 }];
users.includes({ id: 2 });          // false (different object reference)
users.some((u) => u.id === 2);      // true
```

## 5. Real-world: show an error banner if any field is invalid

`some` fits because a single error is enough to show the banner.

```jsx
const errors = { name: "", email: "Invalid email", password: "" };
const hasErrors = Object.values(errors).some((msg) => msg !== ""); // true

{hasErrors && <p className="error">Please fix the highlighted fields.</p>}
```

## 6. Real-world: role / permission check

Show the admin panel if the user has **any** of the allowed roles.

```js
const user = { name: "Ashutosh", roles: ["editor", "viewer"] };
const canSeeDashboard = ["admin", "editor"].some((role) => user.roles.includes(role)); // true
```

## 7. Real-world: prevent duplicates before adding to state

Before adding a product to the cart, check whether it's already there.

```js
const cart = [{ id: 1, name: "Shoes" }];
const product = { id: 1, name: "Shoes" };

if (!cart.some((item) => item.id === product.id)) {
  // setCart([...cart, product]);
}
```

## Gotchas

- `[].some(...)` is **`false`**, while `[].every(...)` is `true`.
- The callback must **return** a value; braces without `return` give `undefined`, so `some` returns `false`.
- Truthy/falsy, not strict booleans: `[0, "", null].some((x) => x)` is `false`.
- Holes in sparse arrays are skipped.
- Need the matching element itself? Use `find`. Need its position? Use `findIndex`.

## Comparison

| Method | Question it answers | Returns | Stops early | Empty array |
|---|---|---|---|---|
| `some` | Does **at least one** pass? | boolean | on first `true` | `false` |
| `every` | Do **all** pass? | boolean | on first `false` | `true` |
| `includes` | Is this exact value present? | boolean | on first match | `false` |
| `find` | Which is the first that passes? | element or `undefined` | on first match | `undefined` |
| `findIndex` | Where is the first that passes? | index or `-1` | on first match | `-1` |

## Interview questions

**1. What is the difference between `some` and `every`?**

<details>
<summary>Answer</summary>

`some` returns `true` if at least one element passes and stops at the first pass. `every` returns `true` only if all elements pass and stops at the first failure. On an empty array, `some` returns `false` and `every` returns `true`.

</details>

**2. When would you use `some` instead of `includes`?**

<details>
<summary>Answer</summary>

When you need a condition rather than an exact value, for example matching objects by a property (`users.some(u => u.id === 2)`). `includes` compares values directly, so it can't find an object by its fields. (`includes` also finds `NaN`; `indexOf` doesn't.)

</details>

**3. What does `[].some(() => true)` return?**

<details>
<summary>Answer</summary>

`false`. The callback is never called because there are no elements, so nothing can pass.

</details>

**4. Implement your own `some` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.mySome = function (cb, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && cb.call(thisArg, this[i], i, this)) return true;
  }
  return false;
};
```

</details>
