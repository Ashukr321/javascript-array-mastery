# Array.of

`Array.of()` creates a new array from its arguments: every argument you pass becomes an element of the array, and the array is returned. `Array.of(1, 1, 3)` gives `[1, 1, 3]`. In everyday code the array literal `[1, 1, 3]` is the simplest way to create an array; `Array.of` exists to fix a quirk of the `Array()` constructor: `Array(3)` creates an **empty sparse array of length 3**, while `Array.of(3)` creates `[3]`. With `Array.of` you can't accidentally create a sparse array.

## Syntax

```js
Array.of(element1, element2, /* ... */ elementN)
```

- `element1 ... elementN`: the values that become the array's elements, in order.
- **Returns:** a new array. `Array.of()` with no arguments returns `[]`.
- **Mutates:** nothing. It's a static method on `Array`.

## 1. Basic usage

```js
Array.of(1, 1, 3);       // [1, 1, 3]
Array.of("a", true, {}); // ["a", true, {}]
Array.of();              // []
```

## 2. The problem it solves: `Array(n)`

```js
Array(3);       // [ <3 empty items> ]  one number = length, not an element
Array(3, 4);    // [3, 4]               two or more = elements
Array.of(3);    // [3]
Array.of(3, 4); // [3, 4]
```

`Array()` behaves differently depending on how many arguments you pass. `Array.of()` always treats arguments as elements.

## 3. `Array.of` vs `Array.from`

```js
Array.of("abc");   // ["abc"]          the argument itself
Array.from("abc"); // ["a", "b", "c"]  converts an iterable
```

## 4. Real-world: wrapping a value from an API

```js
const qty = Number(res.quantity); // e.g. 7
const options = Array.of(qty);    // [7]
// Array(qty) would give [ <7 empty items> ]
```

When the value comes from user input or an API and might be a number, `Array.of` guarantees a one-item array instead of a 7-slot sparse array.

## 5. Real-world: initial selected IDs in React

```js
const [selectedIds, setSelectedIds] = useState(() => Array.of(defaultProductId));
```

A single numeric ID must become `[id]`, and `Array.of` is safe here whereas `new Array(id)` would create an empty array of that length.

## 6. Real-world: generic helpers and typed arrays

```js
const toList = (...values) => Array.of(...values);
toList(5);    // [5]
toList(5, 6); // [5, 6]

const header = Uint8Array.of(0x89, 0x50, 0x4e, 0x47); // PNG file signature bytes
```

In helpers that forward unknown arguments, `Array.of` behaves the same for one or many values; typed arrays like `Uint8Array.of` use the same API to build binary data (file headers, WebSocket messages).

## Comparison

| Expression | Result |
| --- | --- |
| `[3]` | `[3]` (preferred in normal code) |
| `Array.of(3)` | `[3]` |
| `Array(3)` / `new Array(3)` | `[ <3 empty items> ]` (sparse) |
| `Array.from({ length: 3 })` | `[undefined, undefined, undefined]` |

## Gotchas

- An array literal is shorter and clearer when you write the values yourself; `Array.of` is useful when the values come in as arguments or variables.
- `Array.of` doesn't convert anything: `Array.of(new Set([1, 2]))` is `[Set]`, not `[1, 2]`. Use `Array.from` to convert.
- Iterables in JavaScript (array, Map, Set, string) are what `Array.from` and spread accept; `Array.of` just stores whatever you pass.

## Interview questions

**1. Why does `Array.of` exist if we have `Array()`?**

<details>
<summary>Answer</summary>

`Array(n)` with a single number creates an empty array of length `n` (sparse) instead of `[n]`. `Array.of` always uses its arguments as elements, so `Array.of(7)` is `[7]`.

</details>

**2. What's the output of `Array(3).length`, `Array.of(3).length` and `Array(3, 4).length`?**

<details>
<summary>Answer</summary>

`3`, `1` and `2`. `Array(3)` has 3 empty slots, `Array.of(3)` has one element, and `Array(3, 4)` has two elements.

</details>

**3. `Array.of` vs `Array.from`?**

<details>
<summary>Answer</summary>

`Array.of(...items)` puts its arguments into an array as they are. `Array.from(source, mapFn)` converts an iterable or array-like into an array and can map each item.

</details>

**4. Write a polyfill for `Array.of`.**

<details>
<summary>Answer</summary>

```js
Array.myOf = function (...items) {
  return items; // rest parameters are already a real array
};
```

</details>
