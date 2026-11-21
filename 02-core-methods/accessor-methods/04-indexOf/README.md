# indexOf

`indexOf()` searches for an element and returns the **index of its first occurrence**, or `-1` if it isn't there. It's widely used on both **strings and arrays** and works the same way on each. Use it when you need the position of a value, for example to remove or replace it.

## Syntax

```js
array.indexOf(searchElement, fromIndex)
```

- `searchElement`: the value to find, compared with strict equality (`===`).
- `fromIndex` (optional, default `0`): the index to start searching from. A negative value counts from the end.
- **Returns:** the first matching index, or `-1` if not found.
- **Mutates:** no.

## 1. Basic search

```js
const fruits = ["apple", "mango", "banana", "mango"];
fruits.indexOf("mango"); // 1  first occurrence only
fruits.indexOf("kiwi");  // -1
```

## 2. The second argument: where to start

```js
fruits.indexOf("mango", 2); // 3  search starts at index 2

const userName = "Ashutosh";
userName.indexOf("u");    // 3
userName.indexOf("u", 4); // -1  the only "u" is at index 3, before the start
```

`-1` is not an error and not an "index out of bounds" message. It's a normal return value meaning "not found from this position".

## 3. Always check for `-1`

```js
const i = fruits.indexOf("kiwi");
if (i !== -1) {
  fruits.splice(i, 1);
}
```

## 4. Find every occurrence

```js
const positions = [];
let i = fruits.indexOf("mango");
while (i !== -1) {
  positions.push(i);
  i = fruits.indexOf("mango", i + 1);
}
// positions: [1, 3]
```

## 5. Real-world: remove a selected item from state

```js
function removeSelected(selectedIds, id) {
  const i = selectedIds.indexOf(id);
  return i === -1 ? selectedIds : [...selectedIds.slice(0, i), ...selectedIds.slice(i + 1)];
}
```

The list holds plain IDs (primitives), so `indexOf` can find the position directly without a callback.

## 6. Real-world: remove duplicate tags

```js
const tags = ["js", "react", "js", "css"];
const unique = tags.filter((tag, i) => tags.indexOf(tag) === i); // ["js", "react", "css"]
```

`indexOf` always returns the first position, so an item is kept only where it first appears.

## 7. Real-world: split a URL into path and query

```js
const url = "/products?page=2&sort=price";
const q = url.indexOf("?");
const path = q === -1 ? url : url.slice(0, q);  // "/products"
const query = q === -1 ? "" : url.slice(q + 1); // "page=2&sort=price"
```

You need the position of the first `?` to cut the string in two, which is exactly what `indexOf` returns.

## Comparison

| Method | Searches | Match by | Returns |
| --- | --- | --- | --- |
| `indexOf(x)` | left to right | `===` | first index or `-1` |
| `lastIndexOf(x)` | right to left | `===` | last index or `-1` |
| `findIndex(fn)` | left to right | callback | first index or `-1` |
| `includes(x)` | left to right | SameValueZero | `true` / `false` |

## Gotchas

- `if (arr.indexOf(x))` is a bug: index `0` is falsy and `-1` is truthy. Compare with `!== -1`, or use `includes`.
- `[NaN].indexOf(NaN)` is `-1` because `NaN !== NaN`. Use `includes` or `findIndex(Number.isNaN)`.
- Objects match only by reference. Use `findIndex((o) => o.id === id)` to search by a property.
- `arr.splice(-1, 1)` removes the **last** element, so forgetting the `-1` check deletes the wrong item.

## Interview questions

**1. Why does `indexOf` return `-1` instead of `undefined` or throwing?**

<details>
<summary>Answer</summary>

Valid indexes are `0` or greater, so `-1` can never be a real position and safely means "not found". It keeps the return type a number. Not finding something is a normal result, not an error.

</details>

**2. What does `[1, 2, NaN].indexOf(NaN)` return?**

<details>
<summary>Answer</summary>

`-1`. `indexOf` uses strict equality and `NaN === NaN` is `false`. `[1, 2, NaN].includes(NaN)` returns `true`.

</details>

**3. When do you use `findIndex` instead of `indexOf`?**

<details>
<summary>Answer</summary>

When you match by a condition rather than a value, typically for arrays of objects: `users.findIndex((u) => u.id === 7)`. `indexOf` can only compare values or references with `===`.

</details>

**4. What's wrong with `if (list.indexOf(item)) { ... }`?**

<details>
<summary>Answer</summary>

If the item is at index `0`, the condition is falsy and the block is skipped; if it's missing, `-1` is truthy and the block runs. Use `list.indexOf(item) !== -1` or `list.includes(item)`.

</details>
