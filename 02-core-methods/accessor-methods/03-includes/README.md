# includes

`includes()` checks whether an item is **present** in an array and returns `true` or `false`. It works just like the string `includes()` method (`"Ashutosh".includes("A")` is `true`), but on array elements. It's the go-to method for questions like "does this user have the admin role?" or "is this file type allowed?".

## Syntax

```js
array.includes(elementToFind, startIndex)
```

- `elementToFind`: the value to look for.
- `startIndex` (optional, default `0`): the index to start searching from. A negative value counts from the end. If it's `>=` the array length, the array isn't searched and the result is `false`.
- **Returns:** `true` or `false`.
- **Mutates:** no.

## 1. Basic check

```js
const arr = [1, 2, 3, 4, 5, 6];
arr.includes(3); // true
arr.includes(9); // false
```

## 2. The second argument: where to start

```js
arr.includes(3, 10); // false  start index 10 is past the end, nothing is searched
arr.includes(3, 3);  // false  search starts at index 3 (value 4)
arr.includes(6, -1); // true   start at the last element
```

## 3. It finds `NaN`

```js
[NaN].includes(NaN); // true
[NaN].indexOf(NaN);  // -1
```

`includes` uses SameValueZero comparison (like `===`, except `NaN` equals `NaN`).

## 4. Objects are compared by reference

```js
const admin = { role: "admin" };
[admin].includes(admin);             // true   same reference
[admin].includes({ role: "admin" }); // false  different object with the same content
```

## 5. Strings (case-sensitive)

```js
"Ashutosh".includes("A"); // true
"Ashutosh".includes("a"); // false
```

## 6. Real-world: role check

```js
const canDelete = user.roles.includes("admin");
return canDelete && <button onClick={onDelete}>Delete</button>;
```

You only need a yes/no answer, and `includes` gives exactly a boolean, which drops straight into a condition.

## 7. Real-world: form validation

```js
const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
function validateAvatar(file) {
  if (!ALLOWED.includes(file.type)) return "Only PNG, JPEG or WEBP images are allowed";
  return null;
}
```

A whitelist array plus `includes` reads like the rule itself and is easy to extend.

## 8. Real-world: search filter and tag toggle in React

```js
const visible = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

const toggleTag = (tag) =>
  setSelected((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
```

String `includes` does the "contains" search, and array `includes` tells you whether a tag is already selected before toggling it.

## Comparison

| Method | Returns | Finds `NaN` | Custom condition |
| --- | --- | --- | --- |
| `includes(x)` | `true` / `false` | yes | no |
| `indexOf(x)` | index or `-1` | no | no |
| `some(fn)` | `true` / `false` | with a callback | yes |
| `find(fn)` | element or `undefined` | with a callback | yes |

## Gotchas

- Objects and arrays match only by reference. To check by content use `some`: `users.some((u) => u.id === 5)`.
- String `includes` is case-sensitive; lowercase both sides for search.
- For many lookups against a large list, a `Set` (`set.has(x)`) is faster than repeated `includes` calls.
- `includes` doesn't tell you **where** the item is. Use `indexOf` or `findIndex` for that.

## Interview questions

**1. What's the difference between `includes` and `indexOf`?**

<details>
<summary>Answer</summary>

`includes` returns a boolean; `indexOf` returns the position or `-1`. `includes` finds `NaN` (SameValueZero) while `indexOf` uses `===` and can't. Use `includes` when you only need to know if the item exists.

</details>

**2. What does `[1, 2, 3].includes(3, 10)` return?**

<details>
<summary>Answer</summary>

`false`. The start index 10 is beyond the array length, so no element is searched.

</details>

**3. Why is `[{ id: 1 }].includes({ id: 1 })` false?**

<details>
<summary>Answer</summary>

Objects are compared by reference, and the two `{ id: 1 }` literals are different objects. Use `arr.some((o) => o.id === 1)` to compare by content.

</details>

**4. When would you use a `Set` instead of `includes`?**

<details>
<summary>Answer</summary>

When you check membership many times against a big list. `includes` scans the array each time (O(n)), while `Set.has` is O(1) on average.

</details>
