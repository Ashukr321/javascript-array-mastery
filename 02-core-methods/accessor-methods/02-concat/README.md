# concat

`concat()` combines arrays (or values) into a **new array**. It exists on strings too: `"Ash".concat("utosh")` joins strings and returns a new string, and the array version does the same thing with arrays. It's **non-mutating**: the original arrays stay unchanged, which makes it safe for React state.

## Syntax

```js
array.concat(value1, value2, /* ... */ valueN)
```

- `value1 ... valueN` (optional): arrays or plain values. Array arguments are spread **one level** into the result; any other value is added as one element.
- **Returns:** a new array. With no arguments it returns a shallow copy.
- **Mutates:** no.

## 1. Merge two arrays

```js
const arr1 = [1, 2, 3, 4];
const arr2 = [4, 5, 5];
const arr3 = arr1.concat(arr2); // [1, 2, 3, 4, 4, 5, 5]

console.log(arr1);         // [1, 2, 3, 4]  unchanged
console.log(arr3 === arr1); // false  it's a brand new array
```

Duplicates are kept: `concat` just joins, it doesn't remove anything.

## 2. Many arguments, arrays and plain values

```js
[1].concat([2, 3], 4, [5]); // [1, 2, 3, 4, 5]
```

## 3. Only one level is flattened

```js
[1].concat([2, [3, 4]]); // [1, 2, [3, 4]]  inner array stays nested
```

Use `flat()` if you need deeper flattening.

## 4. It's a shallow copy

```js
const a = [{ qty: 1 }];
const b = a.concat([]);
b[0].qty = 99;
console.log(a[0].qty); // 99  same object reference in both arrays
```

## 5. Strings

```js
"Ashu".concat("tosh", "!"); // "Ashutosh!"
```

## 6. Real-world: "load more" / infinite scroll

```js
async function loadMore(page) {
  const res = await fetch(`/api/posts?page=${page}`);
  const data = await res.json();
  setPosts((prev) => prev.concat(data.items));
}
```

Each page from the API is appended to what's already on screen, and because `concat` returns a new array, React sees a new reference and re-renders.

## 7. Real-world: add to cart without mutating

```js
const addToCart = (cart, product) => cart.concat({ ...product, qty: 1 });
```

A non-array argument is added as a single element, so `concat` works as an immutable `push`.

## 8. Real-world: default + user tags

```js
const defaultTags = ["all"];
const userTags = ["react", "node"];
const filterTags = defaultTags.concat(userTags); // ["all", "react", "node"]
```

Fixed options always come first and the user's own choices follow, without touching either source list.

## Comparison

| | `a.concat(b)` | `[...a, ...b]` | `a.push(...b)` |
| --- | --- | --- | --- |
| Mutates `a` | no | no | yes |
| Returns | new array | new array | new length |
| Non-array argument | added as one item | must be iterable to spread | added as one item |
| Works for plain objects | no | yes, as `{...o1, ...o2}` | no |

## Gotchas

- `concat` is an **array/string** method. Plain objects don't have it, so to merge objects use object spread `{ ...obj1, ...obj2 }` or `Object.assign({}, obj1, obj2)`. Arrays **of** objects concat fine.
- Shallow copy: objects inside are shared between the old and new arrays.
- `push` and `concat` look similar but `push` mutates and returns the new length, not the array.
- Only arrays are spread; array-like objects (e.g. `{ 0: "a", length: 1 }`) are added as one element.

## Interview questions

**1. Does `concat` mutate the original array?**

<details>
<summary>Answer</summary>

No. It returns a new array and leaves every input unchanged. The elements are copied shallowly, so objects inside are still shared.

</details>

**2. What's the output of `[1, 2].concat([3, [4, 5]], 6)`?**

<details>
<summary>Answer</summary>

`[1, 2, 3, [4, 5], 6]`. Array arguments are spread only one level, so `[4, 5]` stays nested, and `6` is added as a single element.

</details>

**3. `concat` vs spread: which should you use?**

<details>
<summary>Answer</summary>

Both return a new array. Spread is more common in modern code and can place items anywhere (`[x, ...a, y]`) and also works on objects. `concat` is handy when an argument may be either an array or a single value, because it accepts both.

</details>

**4. How do you merge two objects, since `concat` doesn't work on them?**

<details>
<summary>Answer</summary>

`const merged = { ...a, ...b };` or `Object.assign({}, a, b)`. When keys clash, the later object wins.

</details>
