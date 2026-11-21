# toReversed

`toReversed()` is the **non-mutating** version of `reverse()`. It returns a **new array** with the elements in reverse order and leaves the original array untouched. (Small correction to the owner's note: the method is called `toReversed`, with a "d", and it returns a new reversed **array**, not a method.) Use it whenever the array belongs to someone else: React props and state, data from an API you still need in its original order.

## Syntax

```js
const reversed = array.toReversed();
```

- Takes no arguments.
- **Returns**: a **new** array with the elements in reverse order.
- **Does not mutate** the original array.
- **Support**: ES2023. Node.js 20+, Chrome/Edge 110+, Firefox 115+, Safari 16+. For older environments use `[...arr].reverse()`.

## 1. Basic usage

```js
const arrNum = [1, 2, 3, 4, 5];
const reversedArr = arrNum.toReversed();

reversedArr;            // [5, 4, 3, 2, 1]
arrNum;                 // [1, 2, 3, 4, 5]  (original safe)
reversedArr === arrNum; // false, new array
```

## 2. Compared with reverse

```js
const a = [1, 2, 3];
a.reverse();    // [3, 2, 1]  and a is now [3, 2, 1]

const b = [1, 2, 3];
b.toReversed(); // [3, 2, 1]  and b is still [1, 2, 3]
```

`arr.toReversed()` gives the same result as `[...arr].reverse()`, just shorter and clearer about intent.

## 3. Empty slots become undefined

```js
const sparse = [1, , 3];
sparse.toReversed(); // [3, undefined, 1]  (no holes in the result)
```

## 4. Real-world example: newest-first feed in React

```jsx
function ActivityFeed({ events }) {
  // events arrive oldest-first from the API
  return events.toReversed().map((e) => <li key={e.id}>{e.text}</li>);
}
```

`toReversed` fits because `events` is a prop: `events.reverse()` would flip the parent's array on every render, so the order would toggle back and forth.

## 5. Real-world example: undo history

```js
const history = ["typed 'a'", "typed 'b'", "deleted 'b'"];
const undoList = history.toReversed(); // most recent action first for the UI

undoList[0]; // "deleted 'b'"
history;     // unchanged, still used to replay actions in order
```

It fits because two views of the same data are needed at once: chronological for replay, reverse for display.

## 6. Real-world example: flip a sorted list for descending order

```js
const prices = [199, 499, 999];         // already sorted ascending
const highToLow = prices.toReversed(); // [999, 499, 199]

// in a component with a sort-direction toggle
const rows = direction === "asc" ? prices : prices.toReversed();
```

It fits because flipping an already sorted array is O(n), cheaper than sorting again with a different comparator.

## Gotchas

- It is a **shallow** copy: objects inside are shared, so editing `reversed[0].name` also edits the original's object.
- Not available in Node.js 18 or older browsers: you get `TypeError: arr.toReversed is not a function`. Use `[...arr].reverse()` there.
- Holes in sparse arrays become `undefined`.
- Works on typed arrays too (`Int8Array.prototype.toReversed`).

## Comparison

| Method | Mutates? | Returns |
| --- | --- | --- |
| `reverse()` | Yes | Same array |
| `toReversed()` | No | New array (ES2023) |
| `[...arr].reverse()` | No | New array (works everywhere) |
| `arr.slice().reverse()` | No | New array (works everywhere) |

## Interview questions

**1. What is the difference between `reverse` and `toReversed`?**

<details>
<summary>Answer</summary>

`reverse` reverses in place and returns the same array. `toReversed` returns a new reversed array and leaves the original unchanged.

</details>

**2. What does this log? `const a = [1, 2]; const b = a.toReversed(); b[0] = 9; console.log(a);`**

<details>
<summary>Answer</summary>

`[1, 2]`. `b` is a separate array, so changing it does not affect `a`.

</details>

**3. Is `toReversed` a deep copy?**

<details>
<summary>Answer</summary>

No, it is shallow. The array is new, but object elements are the same references as in the original.

</details>

**4. How would you reverse without mutating in an environment that lacks `toReversed`?**

<details>
<summary>Answer</summary>

`[...arr].reverse()` or `arr.slice().reverse()`.

</details>
