# at

`at()` is a modern way (ES2022) to read an element by index. It works on both **arrays and strings**. With an index `>= 0` it works like normal bracket indexing; with an index `< 0` it counts from the **end** of the array, so `at(-1)` is the last item, `at(-2)` the second last, and so on. It's the cleanest way to read "the last item" without writing `arr[arr.length - 1]`.

## Syntax

```js
array.at(index)
```

- `index`: an integer. Positive counts from the start (0 = first), negative counts from the end (-1 = last). Decimals are truncated (`at(1.7)` is `at(1)`).
- **Returns:** the element at that position, or `undefined` if the index is out of range.
- **Mutates:** no. It only reads.

## 1. Positive index (same as brackets)

```js
const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr[0];    // 1
```

## 2. Negative index (counts from the end)

```js
arr.at(-1); // 5  last element
arr.at(-2); // 4  second last element
arr[-1];    // undefined  brackets only work with positive indexes
```

`arr[-1]` doesn't count from the end: it looks for a property literally named `"-1"`, which doesn't exist. That's why `[]` works only with positive indexes while `at()` works with both.

## 3. Out of range gives `undefined`

```js
arr.at(10);  // undefined
arr.at(-10); // undefined (not 5)
[].at(-1);   // undefined
```

## 4. Works on strings too

```js
const name = "Ashutosh";
name.at(0);  // "A"
name.at(-1); // "h"
```

## 5. Real-world: last message in a chat

```js
function ChatPreview({ messages }) {
  const last = messages.at(-1);
  return <p>{last ? last.text : "No messages yet"}</p>;
}
```

The preview always shows the newest message, and `at(-1)` says "last item" directly; it also returns `undefined` on an empty list instead of crashing.

## 6. Real-world: current page in breadcrumbs

```js
const crumbs = ["Home", "Products", "Laptops"];
const current = crumbs.at(-1);        // "Laptops"
const parents = crumbs.slice(0, -1);  // ["Home", "Products"]
```

The last crumb is the current page (rendered as plain text, not a link), so reading it with a negative index is the natural fit.

## 7. Real-world: price change from API data

```js
const prices = [{ day: "Mon", value: 100 }, { day: "Tue", value: 104 }, { day: "Wed", value: 101 }];
const change = prices.at(-1).value - prices.at(-2).value; // -3
```

Time-series data from an API is usually sorted oldest to newest, so "today" and "yesterday" are the last two items.

## 8. Real-world: file extension

```js
"report.final.pdf".split(".").at(-1); // "pdf"
```

A file name can contain many dots; only the last part is the extension.

## Comparison

| Expression | Last item | Negative index | Empty array |
| --- | --- | --- | --- |
| `arr.at(-1)` | yes | yes | `undefined` |
| `arr[arr.length - 1]` | yes | no | `undefined` |
| `arr[-1]` | no (`undefined`) | no | `undefined` |
| `arr.slice(-1)[0]` | yes (creates a new array) | yes | `undefined` |

## Gotchas

- `undefined` is returned both for "out of range" and for an element whose value is actually `undefined`. Check `arr.length` if you need to tell them apart.
- `at()` only reads. `arr.at(-1) = 5` is a syntax error; use `arr[arr.length - 1] = 5` or the non-mutating `arr.with(-1, 5)`.
- It's ES2022: available in Node 16.6+ and modern browsers, not in very old browsers.

## Interview questions

**1. What's the difference between `arr.at(-1)` and `arr[-1]`?**

<details>
<summary>Answer</summary>

`arr.at(-1)` returns the last element. `arr[-1]` looks up a property with the key `"-1"`, which normally doesn't exist, so it returns `undefined`.

</details>

**2. What does `[1, 2, 3, 4, 5].at(-10)` return?**

<details>
<summary>Answer</summary>

`undefined`. `-10 + 5 = -5` is still out of range, and `at()` never throws; it returns `undefined` for any index outside the array.

</details>

**3. Name three ways to get the last element of an array.**

<details>
<summary>Answer</summary>

`arr.at(-1)`, `arr[arr.length - 1]`, and `arr.slice(-1)[0]`. `arr.pop()` also returns it but removes it from the array, so it's not a read.

</details>

**4. Write a polyfill for `at`.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myAt = function (index) {
  let i = Math.trunc(index) || 0;
  if (i < 0) i += this.length;
  if (i < 0 || i >= this.length) return undefined;
  return this[i];
};
```

</details>
