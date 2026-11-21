# new Array()

The `Array` constructor creates a new array. It behaves differently depending on how many arguments you pass: a single number creates an array of that **length** with empty slots, while anything else becomes the array's elements. Because of that surprise, `Array.of()` exists to always treat its arguments as elements.

Remember that an array is a **reference data type**: it is an object, and objects are stored in **heap memory**. A variable holds a reference to the array, not the array itself.

## Syntax

```js
new Array()                   // []
new Array(length)             // array with `length` empty slots
new Array(el0, el1, ..., elN) // array containing those elements
Array(...)                    // same as new Array(...), `new` is optional
Array.of(el0, el1, ..., elN)  // always creates an array of the given elements
```

- `length`: a single integer from 0 to 2^32 - 1. Any other number (e.g. `-1`, `2.5`) throws `RangeError`.
- `el0...elN`: values to put in the array.
- **Returns:** a new `Array`.
- **Mutates:** nothing; it creates a brand-new array.

## 1. One number = length, not an element

```js
const arr = new Array(5);
console.log(arr);        // [ <5 empty items> ]
console.log(arr.length); // 5
console.log(arr[0]);     // undefined (reading a hole gives undefined)
```

The slots are **empty** ("holes"), not real `undefined` values. They read as `undefined`, but the indexes don't exist: `0 in arr` is `false`.

## 2. Several arguments (or a non-number) = elements

```js
new Array(5, 10, 20); // [5, 10, 20]
new Array("5");       // ["5"]  (a string is an element, not a length)
```

## 3. `Array.of()` fixes the single-number surprise

```js
Array.of(5);         // [5]
Array.of(5, 10, 20); // [5, 10, 20]
new Array(5);        // [ <5 empty items> ]
```

Use `Array.of()` when you want to build an array from values, and the literal `[]` syntax in everyday code.

## 4. Holes are skipped by most array methods

```js
const holes = new Array(3);
holes.map(() => 1);                   // [ <3 empty items> ]  map skipped every hole
holes.forEach((x) => console.log(x)); // logs nothing
```

Fill the array first if you want to iterate:

```js
new Array(3).fill(0);                   // [0, 0, 0]
new Array(3).fill().map((_, i) => i);   // [0, 1, 2]
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2] (no holes at all)
```

## 5. Arrays are references

```js
const a = new Array(1, 2, 3);
const b = a;    // copies the reference, not the array
b.push(4);
console.log(a); // [1, 2, 3, 4]  same object in the heap
console.log(typeof a);         // "object"
console.log(Array.isArray(a)); // true
```

## 6. Real-world: placeholders while data loads (React)

```jsx
// Show 6 skeleton cards while the API request is pending
function ProductGrid({ products, loading }) {
  if (loading) {
    // NOT new Array(6).map(...): map skips holes and would render nothing
    return Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />);
  }
  return products.map((p) => <ProductCard key={p.id} product={p} />);
}
```

## Gotchas

- `new Array(5)` creates 5 **empty slots**, not `[5]` and not five real `undefined` values.
- `new Array(-1)` or `new Array(2.5)` throws `RangeError: Invalid array length`.
- `map`, `forEach`, `filter` and `reduce` skip holes; `fill`, `Array.from` and spreading (`[...new Array(3)]`) turn holes into `undefined`.
- `Array(3)` and `new Array(3)` are identical; `new` is optional.
- `new Array(3).fill([])` puts the **same** array reference in every slot. Use `Array.from({ length: 3 }, () => [])` for separate arrays.
- Prefer `[]` literals for readability; reach for the constructor only when you need a fixed length.

## Interview questions

**1. What is the difference between `new Array(3)` and `Array.of(3)`?**

<details>
<summary>Answer</summary>

`new Array(3)` creates an array with `length` 3 and three empty slots. `Array.of(3)` creates `[3]`, an array with one element. `Array.of` always treats its arguments as elements, which removes the single-number ambiguity.

</details>

**2. Why does `new Array(3).map((_, i) => i)` return `[ <3 empty items> ]`?**

<details>
<summary>Answer</summary>

The slots are holes (the indexes don't exist), and `map` skips holes. Use `Array.from({ length: 3 }, (_, i) => i)` or `new Array(3).fill().map((_, i) => i)` instead.

</details>

**3. What does `typeof []` return, and how do you reliably check for an array?**

<details>
<summary>Answer</summary>

`"object"`, because arrays are objects (a reference type stored in the heap). Use `Array.isArray(value)` to check for an array.

</details>

**4. What happens with `new Array(-1)`?**

<details>
<summary>Answer</summary>

It throws `RangeError: Invalid array length`. A single numeric argument must be an integer between 0 and 2^32 - 1.

</details>
