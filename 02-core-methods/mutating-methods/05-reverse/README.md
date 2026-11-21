# reverse

`reverse()` reverses the order of the elements of an array **in place**: the first element becomes the last and the last becomes the first. Useful for newest-first lists, reversing a string (`str.split("").reverse().join("")`), or flipping a sort order.

## Syntax

```js
array.reverse();
```

- Takes no arguments.
- **Returns**: the **same** array (now reversed), not a copy.

> **Mutates the original array.** To reverse without mutating, use `arr.toReversed()` (ES2023) or make a shallow copy first: `[...arr].reverse()` / `arr.slice().reverse()`.

## 1. Basic usage

```js
const num = [1, 2, 4];
const result = num.reverse();

result;         // [4, 2, 1]
num;            // [4, 2, 1]  (original changed too)
result === num; // true, same array
```

## 2. Reverse without mutating

```js
const num = [1, 2, 4];

const newArr = [...num].reverse(); // shallow copy, then reverse
const newArr2 = num.toReversed();  // modern, same result

num;            // [1, 2, 4]  (untouched)
num === newArr; // false, they are different arrays
```

## 3. Reverse a string

Strings have no `reverse`, so convert to an array and back:

```js
"hello".split("").reverse().join(""); // "olleh"
[..."hello"].reverse().join("");      // also handles emoji correctly
```

## 4. Real-world example: newest-first in React

```jsx
function Comments({ comments }) {
  // comments come from props: never mutate them
  const newestFirst = comments.toReversed();
  return newestFirst.map((c) => <p key={c.id}>{c.text}</p>);
}
```

Calling `comments.reverse()` here would flip the parent's array on every render.

## Gotchas

- `reverse` returns the same reference, so `const b = a.reverse()` does **not** give you a copy: `a` and `b` are both reversed.
- Copying with spread is **shallow**: objects inside are still shared between the copy and the original.
- `[...arr].reverse() === arr` is `false` (new array), but `arr.reverse() === arr` is `true`.

## Interview questions

**1. Does `reverse` return a new array?**

<details>
<summary>Answer</summary>

No. It reverses in place and returns the same array reference.

</details>

**2. How do you reverse an array without changing the original?**

<details>
<summary>Answer</summary>

`arr.toReversed()` (ES2023), or `[...arr].reverse()` / `arr.slice().reverse()` for older environments.

</details>

**3. Reverse an array manually without `reverse`.**

<details>
<summary>Answer</summary>

Swap from both ends towards the middle, O(n) time and O(1) extra space:

```js
for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```

</details>

**4. What does this log? `const a = [1, 2]; const b = a.reverse(); console.log(a, b);`**

<details>
<summary>Answer</summary>

`[2, 1] [2, 1]`. Both variables point to the same reversed array.

</details>
