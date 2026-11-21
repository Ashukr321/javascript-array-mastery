# unshift

`unshift()` adds one or more new elements at the **start** of an array and returns the new length. Use it when the newest item belongs on top: latest notifications, a pinned item, a "recently viewed" list.

## Syntax

```js
const newLength = array.unshift(item1, item2 /* , ... */);
```

- `item1, item2, ...`: values to add at the front, in the order given.
- **Returns**: the new `length` of the array (not the array).

> **Mutates the original array**: every existing element moves up one index. Non-mutating alternatives: spread, `[newItem, ...arr]`, or `arr.toSpliced(0, 0, newItem)`.

## 1. Basic usage

```js
const num = [1, 2, 4];
num.unshift(-12); // 4  (new length)
num;              // [-12, 1, 2, 4]

num.unshift("a", "b");
num;              // ["a", "b", -12, 1, 2, 4]  (order is kept)
```

## 2. Real-world example: newest notification first (React)

```js
const [notifications, setNotifications] = useState([]);

function addNotification(msg) {
  setNotifications((prev) => [{ id: Date.now(), msg }, ...prev]); // immutable "unshift"
}
```

Calling `prev.unshift(...)` would mutate state, and React would not re-render because the array reference is unchanged.

## 3. Recently viewed (keep max 5)

```js
function addRecent(list, item) {
  return [item, ...list.filter((x) => x !== item)].slice(0, 5);
}
```

## 4. Performance

`unshift` is **O(n)**: every existing element has to move up one index. `push` is O(1) (amortized). If you add to the front often, consider pushing and reading in reverse, or calling `reverse()` once at the end.

## Gotchas

- Returns the new length, so `arr = arr.unshift(x)` turns `arr` into a number.
- `arr.unshift(1, 2)` gives `[1, 2, ...]`, but `unshift(1)` followed by `unshift(2)` gives `[2, 1, ...]`.
- Passing an array adds it as one nested element: `[3].unshift([1, 2])` gives `[[1, 2], 3]`. Spread it instead: `unshift(...items)`.

## Interview questions

**1. What does `unshift` return?**

<details>
<summary>Answer</summary>

The new length of the array, not the array itself.

</details>

**2. Why is `unshift` slower than `push`?**

<details>
<summary>Answer</summary>

`unshift` has to move every existing element one index up (O(n)). `push` writes to the end without moving anything (O(1)).

</details>

**3. How do you add to the start of a React state array?**

<details>
<summary>Answer</summary>

Create a new array: `setItems(prev => [newItem, ...prev])`. Never call `unshift` on state.

</details>

**4. What is the result of `const a = [3]; a.unshift(1, 2); a.unshift(0);`?**

<details>
<summary>Answer</summary>

`[0, 1, 2, 3]`. The first call adds 1 and 2 in order, the second adds 0 in front.

</details>
