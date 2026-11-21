# Array.from

`Array.from()` creates a **new array** from something that isn't an array but can be turned into one: an **array-like object** or an **iterable**. An array-like object has a `length` property and (usually) indexed keys `0, 1, 2...`, like `{ 0: "a", 1: "b", length: 2 }`, `arguments` or a DOM `NodeList`. An iterable is anything you can loop over with `for...of`: strings, `Set`, `Map`, arrays. Its optional second argument maps each item while creating the array, which makes it great for **API response transformation**.

## Syntax

```js
Array.from(arrayLikeOrIterable, mapFn, thisArg)
```

- `arrayLikeOrIterable`: the source to convert.
- `mapFn` (optional): called as `mapFn(element, index)` for each item; its return value goes into the array.
- `thisArg` (optional): value used as `this` inside a regular-function `mapFn`.
- **Returns:** a new array.
- **Mutates:** no. It's a static method on `Array`, not on array instances.

## 1. From a string (iterable)

```js
Array.from("ashutosh"); // ["a", "s", "h", "u", "t", "o", "s", "h"]
```

## 2. From an array-like object

```js
const apiResponse = {
  0: { name: "Ashutosh", age: 21 },
  1: { name: "Amit", age: 25 },
  length: 2,
};
Array.from(apiResponse); // [{ name: "Ashutosh", age: 21 }, { name: "Amit", age: 25 }]
```

Strictly, only `length` is required. Missing indexes become `undefined`:

```js
Array.from({ length: 3 });      // [undefined, undefined, undefined]
Array.from({ 0: "a" });         // []  no length, so nothing is copied
```

## 3. From a `Set`: unique values

```js
const arr = [1, 2, 2, 1, 1, 1];
Array.from(new Set(arr)); // [1, 2]
```

`new Set()` removes duplicates, and because a Set is iterable, `Array.from` turns it back into an array.

## 4. From a `Map`

```js
const stock = new Map([["apple", 5], ["mango", 0]]);
Array.from(stock);        // [["apple", 5], ["mango", 0]]
Array.from(stock.keys()); // ["apple", "mango"]
```

## 5. With a map function

```js
Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]
Array.from("123", Number);                   // [1, 2, 3]
```

## 6. Real-world: API response transformation

```js
const res = { 0: { id: 1, title: "Post A" }, 1: { id: 2, title: "Post B" }, length: 2 };
const titles = Array.from(res, (post) => post.title); // ["Post A", "Post B"]
```

Some APIs (and older PHP/Firebase backends) send index-keyed objects; `Array.from` converts and maps them in one step so you can use array methods afterwards.

## 7. Real-world: pagination buttons and skeleton loaders

```js
const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
// [1, 2, 3, ...] -> pages.map((p) => <button key={p}>{p}</button>)

const skeletons = Array.from({ length: 4 }, (_, i) => <div key={i} className="skeleton" />);
```

You need "N things" with no source array, and `{ length: N }` plus a map function generates them directly.

## 8. Real-world: DOM NodeList to array

```js
const checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked"), (el) => el.value);
```

`querySelectorAll` returns a NodeList, which has no `map`/`filter`; `Array.from` turns it into a real array and extracts the values at once.

## 9. Real-world: unique tags from posts

```js
const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
```

A tag filter bar should show each tag once, and Set + `Array.from` is the shortest way to dedupe.

## Comparison

| Expression | Result |
| --- | --- |
| `Array.from({ length: 3 })` | `[undefined, undefined, undefined]` (real slots) |
| `new Array(3)` / `Array(3)` | `[ <3 empty items> ]` (holes, `map` skips them) |
| `Array.of(3)` | `[3]` |
| `[..."abc"]` | `["a", "b", "c"]` (spread needs an iterable; no array-likes) |

## Gotchas

- Spread `[...x]` only works on iterables; `Array.from` also works on array-likes such as `{ length: 2 }`.
- A plain object without `length` gives `[]`. Use `Object.values(obj)` for normal objects.
- It's a shallow copy: objects inside are shared with the source.
- `mapFn` gets `(element, index)` only, not the third `array` argument that `map` gets.
- `Array.from("😀")` splits by code point (`["😀"]`), while `"😀".split("")` breaks it into two broken halves.

## Interview questions

**1. What's the difference between an array-like object and an iterable?**

<details>
<summary>Answer</summary>

An array-like has a `length` property and indexed keys (e.g. `arguments`, NodeList, `{ 0: "a", length: 1 }`). An iterable implements `Symbol.iterator` so it works with `for...of` and spread (strings, arrays, Set, Map). `Array.from` accepts both; spread accepts only iterables.

</details>

**2. Create an array `[1, 2, ..., n]` in one line.**

<details>
<summary>Answer</summary>

```js
Array.from({ length: n }, (_, i) => i + 1);
```

</details>

**3. What's the difference between `Array.from({ length: 3 })` and `new Array(3)`?**

<details>
<summary>Answer</summary>

`Array.from({ length: 3 })` creates 3 real elements set to `undefined`, so `map` works on them. `new Array(3)` creates a sparse array with 3 empty slots, and `map`/`forEach` skip holes.

</details>

**4. How do you remove duplicates from an array?**

<details>
<summary>Answer</summary>

`Array.from(new Set(arr))` or `[...new Set(arr)]`. A Set stores each value once, and converting back gives a deduplicated array (objects are compared by reference).

</details>
