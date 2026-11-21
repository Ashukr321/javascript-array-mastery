# join

`join()` turns all the items of an array into a **single string**, with a separator between them: `["a", "s", "h", "u"].join("-")` gives `"a-s-h-u"`. It's **non-mutating**. It's the opposite of the string `split()` method: array to string uses `join`, string to array uses `split`.

## Syntax

```js
array.join(separator)
```

- `separator` (optional, default `","`): the string placed between elements. If you don't pass anything, items are separated by a comma.
- **Returns:** a string. An empty array gives `""`; a one-item array gives that item with no separator.
- **Mutates:** no.

## 1. Default and custom separators

```js
const arr = ["a", "s", "h", "u"];
arr.join();    // "a,s,h,u"
arr.join("-"); // "a-s-h-u"
arr.join("");  // "ashu"
arr.join(" "); // "a s h u"

typeof arr;           // "object"  arrays are objects
typeof arr.join("-"); // "string"
```

## 2. `null`, `undefined` and holes become empty strings

```js
[1, null, 2, undefined, 3].join("-"); // "1--2--3"
[1, , 3].join("-");                   // "1--3"
```

## 3. Nested arrays and objects

```js
[1, [2, 3], 4].join("-");  // "1-2,3-4"  inner array uses its own toString (comma)
[{ a: 1 }].join();         // "[object Object]"
```

Map objects to strings first: `users.map((u) => u.name).join(", ")`.

## 4. With `split`: reverse a string

```js
"Ashutosh".split("").reverse().join(""); // "hsotuhsA"
```

## 5. Real-world: building a className in React

```js
const className = ["btn", isPrimary && "btn-primary", disabled && "btn-disabled"]
  .filter(Boolean)
  .join(" ");
// "btn btn-primary"
```

CSS classes are a space-separated string, so collect them in an array, drop the `false` ones, and `join(" ")`.

## 6. Real-world: CSV export

```js
const rows = [
  ["Name", "Age"],
  ["Ashutosh", 21],
  ["Amit", 25],
];
const csv = rows.map((row) => row.join(",")).join("\n");
// "Name,Age\nAshutosh,21\nAmit,25"
```

A CSV is rows joined by newlines, each row being cells joined by commas, so two `join` calls build the whole file.

## 7. Real-world: query string and breadcrumbs

```js
const params = { q: "red shoes", page: 2 };
const query = Object.entries(params)
  .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
  .join("&"); // "q=red%20shoes&page=2"

["Home", "Products", "Laptops"].join(" / "); // "Home / Products / Laptops"
```

URLs and breadcrumb trails are lists of pieces with a fixed separator, which is exactly what `join` produces.

## Comparison

| Expression | Result for `[1, null, [2, 3]]` |
| --- | --- |
| `arr.join()` | `"1,,2,3"` |
| `arr.join(" ")` | `"1  2,3"` |
| `arr.toString()` | `"1,,2,3"` (same as `join()`) |
| `JSON.stringify(arr)` | `"[1,null,[2,3]]"` |

## Gotchas

- Objects become `"[object Object]"`; map them to strings first.
- Joining CSV cells that contain commas or quotes breaks the format; such cells must be wrapped in quotes and escaped.
- `join` never adds a separator at the start or end; add it yourself if you need a trailing newline.
- Numbers are converted with `String()`, so `[0.1 + 0.2].join()` is `"0.30000000000000004"`.

## Interview questions

**1. What does `[null, undefined, 1].join("-")` return?**

<details>
<summary>Answer</summary>

`"--1"`. `null` and `undefined` are turned into empty strings, so only the separators remain before `1`.

</details>

**2. What's the difference between `join()` and `toString()` on an array?**

<details>
<summary>Answer</summary>

`toString()` is the same as `join(",")`. `join` lets you choose the separator.

</details>

**3. Reverse a string using array methods.**

<details>
<summary>Answer</summary>

```js
const reversed = str.split("").reverse().join("");
```

`split("")` breaks it into characters, `reverse()` flips the array, `join("")` glues it back. (Use `[...str]` instead of `split("")` if the string can contain emoji.)

</details>

**4. What does `[1, [2, [3, 4]]].join(";")` return?**

<details>
<summary>Answer</summary>

`"1;2,3,4"`. Only the top level uses `;`; the nested array is converted with its own `toString`, which joins with commas all the way down.

</details>
