# find

`find()` searches an array and returns the **first element** that matches a condition. As soon as it finds a match it returns that element and stops; if nothing matches it returns `undefined`. It **doesn't mutate** the array. `find` returns a **single element**, while `filter` returns an **array** of all matching elements. It's the go-to method for "get the user with this id" or "get the selected option".

`find` is a **higher-order function (HOF)**. A higher-order function is one that does at least one of these:

1. takes a function as an argument (like `find`, which takes a callback), **or**
2. returns a new function. (The returned function often uses variables from the outer function, which makes it a **closure**, but returning a function is what makes it a HOF; closures are a separate idea.)

## Syntax

```js
array.find((element, index, array) => {
  // return true for the element you want
}, thisArg)
```

- `element`: the element being processed.
- `index` (optional): the index of the current element.
- `array` (optional): the array `find` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** the first element for which the callback returns truthy, or `undefined`.
- **Mutates:** no.

## 1. Basic search

```js
const nums = [5, 12, 8, 130, 44];
nums.find((n) => n > 10); // 12 (first match only, 130 and 44 are ignored)
nums.find((n) => n > 500); // undefined
```

## 2. Array of objects

```js
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];
const bob = users.find((u) => u.id === 2); // { id: 2, name: "Bob" }
```

## 3. `find` vs `filter`

```js
users.find((u) => u.id > 1);   // { id: 2, name: "Bob" }       a single element
users.filter((u) => u.id > 1); // [{ id: 2, ... }, { id: 3, ... }]  an array
```

## 4. Handling "not found"

Since `find` returns `undefined` on no match, guard before reading properties, or use optional chaining and a default.

```js
const user = users.find((u) => u.id === 99);
user.name;                         // TypeError: Cannot read properties of undefined
user?.name ?? "Guest";             // "Guest"
```

## 5. Real-world: find a user by id from an API response

A profile page gets an id from the URL and needs that user's object from the list the API returned. `find` fits because ids are unique: there's exactly one match, and you want the object, not an array.

```jsx
function Profile({ users, userId }) {
  const user = users.find((u) => u.id === Number(userId));
  if (!user) return <p>User not found</p>;
  return <h1>{user.name}</h1>;
}
```

## 6. Real-world: selected item in a dropdown

State stores only the selected id; `find` turns it back into the full option for display.

```js
const plans = [
  { id: "free", label: "Free", price: 0 },
  { id: "pro", label: "Pro", price: 499 },
];
const selectedId = "pro";
const selectedPlan = plans.find((p) => p.id === selectedId); // { id: "pro", ... }
```

## 7. Real-world: look up a config / feature flag

```js
const flags = [
  { key: "darkMode", enabled: true },
  { key: "betaCheckout", enabled: false },
];
const isDarkMode = flags.find((f) => f.key === "darkMode")?.enabled ?? false; // true
```

If you do many lookups on the same list, build a lookup object once with `reduce` (or a `Map`) instead of calling `find` each time.

## Gotchas

- Not found gives **`undefined`**, not `-1` (that's `findIndex`) and not `null`.
- If the matching element itself is `undefined` (e.g. `[undefined].find(() => true)`), you can't tell "found undefined" from "not found". Use `findIndex` or `some` then.
- Unlike most iteration methods, `find` **does visit holes** in sparse arrays (as `undefined`).
- It returns a **reference** to the object, not a copy: changing `bob.name` changes the object inside `users`.
- Need the last match? Use `findLast()`.

## Comparison

| Method | Returns | When nothing matches |
|---|---|---|
| `find` | first matching element | `undefined` |
| `findIndex` | index of first match | `-1` |
| `findLast` / `findLastIndex` | last match / its index | `undefined` / `-1` |
| `filter` | array of all matches | `[]` |
| `some` | `true`/`false` | `false` |
| `indexOf` / `includes` | index / boolean for an exact value | `-1` / `false` |

## Interview questions

**1. What's the difference between `find` and `filter`?**

<details>
<summary>Answer</summary>

`find` returns the first matching element itself (or `undefined`) and stops searching at that point. `filter` always walks the whole array and returns a new array of every match (or `[]`).

</details>

**2. What does `find` return when nothing matches, and how is that different from `findIndex`?**

<details>
<summary>Answer</summary>

`find` returns `undefined`; `findIndex` returns `-1`. Be careful: `-1` is truthy, so `if (arr.findIndex(...))` is wrong, compare with `!== -1` instead.

</details>

**3. What is a higher-order function? Is `find` one?**

<details>
<summary>Answer</summary>

A function that takes a function as an argument and/or returns a function. `find` is one because it takes a callback. A closure is a function that remembers variables from the scope it was created in; HOFs often return closures, but the two terms mean different things.

</details>

**4. Implement your own `find` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myFind = function (cb, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (cb.call(thisArg, this[i], i, this)) return this[i];
  }
  return undefined;
};
```

There is no `i in this` check, because `find` visits holes.

</details>
