# splice

`splice()` is the Swiss-army knife of array mutation: with one method you can **add** elements, **remove** elements, or **replace** previous values with new values, at any position in the array. Typical uses: removing an item from a cart, updating one record in a list, inserting a high-priority task at the top.

## Syntax

```js
const removed = array.splice(startIndex, deleteCount, item1, item2 /* , ... */);
```

- `startIndex`: index where the change starts. Negative counts from the end.
- `deleteCount` (optional): how many elements to remove from `startIndex`. If omitted, everything from `startIndex` to the end is removed. `0` means remove nothing (insert only).
- `item1, item2, ...` (optional): elements to add at `startIndex`.
- **Returns**: an array of the **removed** elements (empty array if none were removed).

> **Mutates the original array.** The non-mutating twin is `arr.toSpliced(start, deleteCount, ...items)` (ES2023), which returns a new array. To only *read* a range, use `slice(start, end)`, which never mutates.

Do not mix up the signatures:

```js
fill(value, startIndex, endIndex);          // endIndex excluded
splice(startIndex, deleteCount, ...items);  // a count, not an end index
```

## 1. Remove elements

```js
const data = [1, 2, 4, 4, 4, 4];
data.splice(1, 3); // from index 1, remove 3 elements -> returns [2, 4, 4]
data;              // [1, 4, 4]
```

Empty an array in place (other references to it see the change too):

```js
const arr = [5, 4, 3, 3, 2];
arr.splice(0, arr.length);
arr; // []
```

## 2. Add elements (deleteCount = 0)

```js
const data = [1, 4, 4];
data.splice(0, 0, 1, 2, 6); // insert at index 0, remove nothing
data;                        // [1, 2, 6, 1, 4, 4]

const tasks = ["Task1", "Task2", "Task3"];
tasks.splice(0, 0, "Urgent Task"); // add high-priority task at the top
// ["Urgent Task", "Task1", "Task2", "Task3"]
```

## 3. Replace elements

```js
const arr = [10, 20, 30, 40];
arr.splice(1, 1, 99); // start at 1, delete 1, insert 99
arr;                  // [10, 99, 30, 40]

const number = [1, 2, 4];
number.splice(0, 1, 5); // delete 1 element at index 0, insert 5
number;                 // [5, 2, 4]
```

## 4. Real-world example: cart and user list

Find the item with `findIndex` (it returns the index of the first match, or `-1`), then splice. Always guard against `-1`: `splice(-1, 1)` would remove the **last** item instead.

```js
const cart = [
  { id: 1, name: "Shoes" },
  { id: 2, name: "T-shirt" },
  { id: 3, name: "Watch" },
];

const index = cart.findIndex((item) => item.id === 2);
if (index !== -1) {
  cart.splice(index, 1); // remove the T-shirt
}

const users = [
  { id: 1, name: "Ashu" },
  { id: 2, name: "Rahul" },
];
const i = users.findIndex((u) => u.id === 2);
users.splice(i, 1, { id: 2, name: "Rahul Kumar" }); // update one record
```

In React state, use the immutable versions instead:

```js
setCart((prev) => prev.filter((item) => item.id !== id));                // remove
setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, name } : u))); // update
setTasks((prev) => prev.toSpliced(0, 0, "Urgent Task"));                 // insert
```

## 5. Performance

`splice` is **O(n)** in the worst case: removing or inserting near the start means every later element has to move. Removing at the end (`splice(-1, 1)`) is cheap, just like `pop`.

## Gotchas

- `findIndex` returning `-1` plus `splice(-1, 1)` silently deletes the last element. Check `index !== -1`.
- The return value is the **removed** elements, not the updated array: `arr = arr.splice(1, 1)` is a bug.
- `splice(start)` with no `deleteCount` removes everything from `start` to the end.
- Splicing inside a forward `for` loop skips elements because indexes shift. Loop backwards or use `filter`.
- `slice` (no "p") does not mutate; `splice` does. A classic interview mix-up.

## Interview questions

**1. What is the difference between `slice` and `splice`?**

<details>
<summary>Answer</summary>

`slice(start, end)` returns a new array copy of a range and does not mutate (end excluded). `splice(start, deleteCount, ...items)` mutates the array to remove/insert/replace and returns the removed elements.

</details>

**2. What does `splice` return?**

<details>
<summary>Answer</summary>

An array of the removed elements. If nothing was removed (e.g. `deleteCount` is `0`), it returns `[]`.

</details>

**3. How do you remove an object from an array by id, safely?**

<details>
<summary>Answer</summary>

`const i = arr.findIndex(x => x.id === id); if (i !== -1) arr.splice(i, 1);` The `-1` check matters because `splice(-1, 1)` would remove the last element. Immutably: `arr.filter(x => x.id !== id)`.

</details>

**4. How do you insert an element at index 2 without mutating the original?**

<details>
<summary>Answer</summary>

`arr.toSpliced(2, 0, item)`, or `[...arr.slice(0, 2), item, ...arr.slice(2)]`.

</details>
