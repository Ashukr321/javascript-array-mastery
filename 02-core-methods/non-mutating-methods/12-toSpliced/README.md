# toSpliced

`toSpliced()` is the **non-mutating** version of `splice()`. `splice` mutates the original array; `toSpliced` (note the "d": the owner's note calls it "toSplice") leaves the original alone and returns a **new array** with the removals, insertions or replacements applied. It is perfect for React state: removing an item from a list, inserting at a position, or replacing one entry, all in one call.

## Syntax

```js
const newArray = array.toSpliced(startIndex, deleteCount, item1, item2 /* , ... */);
```

- `startIndex`: index where the change starts. Negative counts from the end.
- `deleteCount` (optional): how many elements to remove. Omitted means "to the end". `0` means insert only.
- `item1, item2, ...` (optional): elements to insert at `startIndex`.
- **Returns**: the **new array** after the change. (Different from `splice`, which returns the *removed* elements.)
- **Does not mutate** the original array.
- **Support**: ES2023. Node.js 20+, Chrome/Edge 110+, Firefox 115+, Safari 16+.

## 1. Replace

```js
const fruits = ["apple", "banana", "cherry"];
const result = fruits.toSpliced(1, 1, "mango"); // start at 1, remove 1, insert "mango"

result; // ["apple", "mango", "cherry"]
fruits; // ["apple", "banana", "cherry"]  (unchanged)
```

## 2. Remove

```js
const nums = [10, 20, 30, 40];
nums.toSpliced(1, 2); // [10, 40]
nums.toSpliced(-1);   // [10, 20, 30]  (remove the last element)
nums;                 // [10, 20, 30, 40]
```

## 3. Insert

```js
const tasks = ["Task1", "Task2"];
tasks.toSpliced(0, 0, "Urgent");   // ["Urgent", "Task1", "Task2"]
tasks.toSpliced(1, 0, "A", "B");   // ["Task1", "A", "B", "Task2"]
```

## 4. Real-world example: remove an item from a list in React

```jsx
function TodoList() {
  const [todos, setTodos] = useState(["Buy milk", "Pay bills", "Call mom"]);

  const removeAt = (index) => setTodos((prev) => prev.toSpliced(index, 1));

  return todos.map((t, i) => (
    <li key={t}>
      {t} <button onClick={() => removeAt(i)}>x</button>
    </li>
  ));
}
```

`toSpliced` fits because you already have the index from `map`, and it removes by position without mutating state. (If you remove by id, `filter` is just as good.)

## 5. Real-world example: insert a row at a position

```js
const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
const withNewRow = rows.toSpliced(1, 0, { id: 99 }); // "insert below row 1"

withNewRow.map((r) => r.id); // [1, 99, 2, 3]
```

It fits because insertion at an index without `toSpliced` needs `[...arr.slice(0, i), item, ...arr.slice(i)]`, which is harder to read.

## 6. Real-world example: drag and drop reorder

```js
function move(list, from, to) {
  const item = list[from];
  return list.toSpliced(from, 1).toSpliced(to, 0, item);
}

move(["a", "b", "c", "d"], 0, 2); // ["b", "c", "a", "d"]
```

It fits because each step is a pure "remove here, insert there" operation that returns a new array ready for `setState`.

## Gotchas

- Return value differs from `splice`: `toSpliced` returns the **new array**, `splice` returns the **removed** elements. Need the removed items? Use `arr.slice(start, start + deleteCount)`.
- Like `splice`, a `-1` index from `findIndex` means "last element": `arr.toSpliced(-1, 1)` removes the last item. Check `index !== -1` first.
- Shallow copy: objects inside are shared.
- Holes in sparse arrays become `undefined`.
- Typed arrays have `toReversed`, `toSorted` and `with`, but **not** `toSpliced` (they cannot change length).

## Comparison

| Method | Mutates? | Returns |
| --- | --- | --- |
| `splice(s, n, ...items)` | Yes | Removed elements |
| `toSpliced(s, n, ...items)` | No | New array (ES2023) |
| `slice(s, e)` | No | New array with only that range |
| `filter(fn)` | No | New array without non-matching items |
| `with(i, v)` | No | New array with one index replaced |

## Interview questions

**1. What do `splice` and `toSpliced` return?**

<details>
<summary>Answer</summary>

`splice` returns an array of the removed elements (and mutates the original). `toSpliced` returns the whole new array after the change and leaves the original untouched.

</details>

**2. Remove the element at index 2 from React state immutably.**

<details>
<summary>Answer</summary>

`setItems(prev => prev.toSpliced(2, 1))`, or `prev.filter((_, i) => i !== 2)`.

</details>

**3. What is `[1, 2, 3].toSpliced(1, 0, "x")`?**

<details>
<summary>Answer</summary>

`[1, "x", 2, 3]`. `deleteCount` is `0`, so nothing is removed and `"x"` is inserted at index 1.

</details>

**4. Why doesn't `Int32Array` have `toSpliced`?**

<details>
<summary>Answer</summary>

Typed arrays have a fixed length, and `toSpliced` can produce an array of a different length. The other ES2023 copy methods (`toReversed`, `toSorted`, `with`) keep the length, so typed arrays do have them.

</details>
