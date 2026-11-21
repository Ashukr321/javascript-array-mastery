# values

`values()` returns an **iterator** that yields each **value** of the array in order. It's what `for...of` uses under the hood: `arr[Symbol.iterator]` is literally the same function as `arr.values`. Arrays, Sets and Maps all have `.values()`, so it's useful for code that should work with any of them.

## Syntax

```js
array.values()
```

- **Parameters:** none.
- **Returns:** a new Array Iterator object that yields each element.
- **Mutates:** no.

## 1. Basic usage

```js
const nums = [10, 20, 30];

for (const n of nums.values()) {
  console.log(n); // 10, 20, 30
}

// identical to:
for (const n of nums) console.log(n);

console.log(nums.values === nums[Symbol.iterator]); // true
```

## 2. Manual stepping with `next()`

```js
const it = nums.values();
console.log(it.next()); // { value: 10, done: false }
console.log(it.next()); // { value: 20, done: false }
console.log(it.next()); // { value: 30, done: false }
console.log(it.next()); // { value: undefined, done: true }
```

## 3. Iterators are live and lazy

The iterator reads the array by index as it goes, so changes made before a value is reached are visible:

```js
const letters = ["a", "b", "c"];
const it2 = letters.values();
console.log(it2.next().value); // "a"
letters[1] = "B";
console.log(it2.next().value); // "B"
```

## 4. Holes become `undefined`

```js
console.log([...[1, , 3].values()]); // [1, undefined, 3]
```

## 5. Real-world: feed an iterable to a `Set`, or accept any collection (React)

```js
// API response with repeated categories
const products = [
  { id: 1, category: "shoes" },
  { id: 2, category: "bags" },
  { id: 3, category: "shoes" },
];
const uniqueCategories = new Set(products.map((p) => p.category).values()); // Set { "shoes", "bags" }
```

```jsx
// tags can be an array or a Set: both have .values()
function TagList({ tags }) {
  return [...tags.values()].map((t) => <span key={t}>{t}</span>);
}
```

## Gotchas

- Returns an iterator: no `.length`, no array methods (spread it first), single-use.
- `values()` includes holes as `undefined`; `forEach` skips them.
- `Object.values(obj)` is a different, static method that returns a real array.
- Pushing to the array while iterating makes the loop visit the new items too, which can loop forever.
- You rarely need `arr.values()` explicitly, because `for...of arr` already uses it.

## Interview questions

**1. Is there a difference between `for (const x of arr)` and `for (const x of arr.values())`?**

<details>
<summary>Answer</summary>

No. `arr[Symbol.iterator]` is the same function as `arr.values`, so both loops behave identically.

</details>

**2. What does an iterator's `next()` return after the last element?**

<details>
<summary>Answer</summary>

`{ value: undefined, done: true }`, and it keeps returning that on every later call.

</details>

**3. If you change the array while iterating with `values()`, what happens?**

<details>
<summary>Answer</summary>

The iterator is live: it reads by index as it goes, so changes to elements not yet visited are seen, and pushed elements get visited too (which can cause an infinite loop).

</details>

**4. Why call `.values()` explicitly at all?**

<details>
<summary>Answer</summary>

Arrays, Sets and Maps all have `.values()`, so code that calls it works on any of them. It also gives you an iterator you can step through manually with `next()`.

</details>
