# Mutating array methods

Arrays in JavaScript are **mutable**: you can change the original array directly, adding, removing, reordering or overwriting its elements. A **mutating method** changes the array you call it on, instead of giving you a new one. Every variable or component that holds a reference to that array sees the change.

```js
const data = [1, 2, 3];
const sameData = data; // not a copy, same array

sameData.push(4);
data; // [1, 2, 3, 4]  (changed through the other variable)
```

`const` does not protect you here: it stops you from reassigning the variable, not from changing the array's contents.

## Why it matters in React state

React decides whether to re-render by comparing the old and new state **by reference** (`Object.is`). If you mutate the state array and pass it back, the reference is the same, so React may skip the update, and any component or memo that kept the old array now sees changed data.

```js
// wrong: same array, React may not re-render
todos.push(newTodo);
setTodos(todos);

// right: new array
setTodos((prev) => [...prev, newTodo]);
setTodos((prev) => prev.toSorted((a, b) => a.priority - b.priority));
setTodos((prev) => prev.toSpliced(index, 1));
```

Rule of thumb: mutating methods are fine on arrays you created yourself in the current function (local results, loops, buffers). For state, props and shared data, use a non-mutating alternative or copy first (`[...arr].sort()`).

## The 9 mutating methods

| Method | What it does | Returns | Non-mutating alternative |
| --- | --- | --- | --- |
| [copyWithin](01-copyWithin/README.md) | Copies a range onto another position, same length | The same array | `[...arr].copyWithin(t, s, e)` (no built-in) |
| [fill](02-fill/README.md) | Overwrites a range with one value | The same array | `[...arr].fill(v, s, e)` or `arr.map(...)` |
| [pop](03-pop/README.md) | Removes the last element | The removed element | `arr.slice(0, -1)` (read it with `arr.at(-1)`) |
| [push](04-push/README.md) | Adds elements at the end | The new length | `[...arr, x]` or `arr.concat(x)` |
| [reverse](05-reverse/README.md) | Reverses the order | The same array | `arr.toReversed()` |
| [shift](06-shift/README.md) | Removes the first element | The removed element | `arr.slice(1)` (read it with `arr[0]`) |
| [sort](07-sort/README.md) | Sorts (default: as strings) | The same array | `arr.toSorted(fn)` |
| [splice](08-splice/README.md) | Removes, inserts or replaces anywhere | Array of removed elements | `arr.toSpliced(s, n, ...items)` |
| [unshift](09-unshift/README.md) | Adds elements at the start | The new length | `[x, ...arr]` |

`toReversed`, `toSorted`, `toSpliced` and `with` (ES2023) are available in Node.js 20+ and all current browsers.

## Watch the return values

The return values are where most bugs come from:

- `push` / `unshift` return the **new length**, so `arr = arr.push(x)` turns `arr` into a number.
- `pop` / `shift` return the **removed element**.
- `splice` returns an **array of removed elements**, not the updated array.
- `sort` / `reverse` / `fill` / `copyWithin` return the **same** array, so `const sorted = arr.sort()` is not a copy: both names point to the sorted original.

## Interview questions

**1. Which array methods mutate the original array?**

<details>
<summary>Answer</summary>

`copyWithin`, `fill`, `pop`, `push`, `reverse`, `shift`, `sort`, `splice` and `unshift`. Methods like `map`, `filter`, `slice`, `concat`, `toSorted`, `toReversed`, `toSpliced` and `with` return new arrays.

</details>

**2. Why does `setItems(items.sort())` sometimes not re-render in React?**

<details>
<summary>Answer</summary>

`sort` mutates `items` and returns the same reference, so React sees the "new" state as identical to the old one. Use `setItems(items.toSorted())` or `setItems([...items].sort())`.

</details>

**3. Can you push into a `const` array?**

<details>
<summary>Answer</summary>

Yes. `const` prevents reassigning the variable, not mutating the array it points to. Use `Object.freeze(arr)` if you need the contents to be read-only.

</details>
