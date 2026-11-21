# slice

`slice()` extracts a part of an array by **position** and returns it as a **new array**, just like the string `slice()` returns part of a string. The `endIndex` is **exclusive** (not included). It's **non-mutating**: the original array is untouched, which makes it a favourite for pagination and immutable updates in React.

## Syntax

```js
array.slice(startIndex, endIndex)
```

- `startIndex` (optional, default `0`): where to start. Negative counts from the end.
- `endIndex` (optional, default `array.length`): where to stop, **not included**. Negative counts from the end. Values past the end are clamped to the length.
- **Returns:** a new array (a shallow copy of the selected part). It can be empty.
- **Mutates:** no.

## 1. Start and end

```js
const arr = [3, 4, 4, 5, 6, 3];
arr.slice(1, 3); // [4, 4]  indexes 1 and 2; index 3 is excluded
console.log(arr); // [3, 4, 4, 5, 6, 3]  unchanged
```

## 2. One argument or none: copy to the end

```js
arr.slice(2); // [4, 5, 6, 3]  from index 2 to the end
arr.slice(0); // [3, 4, 4, 5, 6, 3]  full copy
arr.slice();  // same full copy
```

## 3. Negative indexes count from the end

```js
arr.slice(-3, -1); // [5, 6]  from the 3rd-last up to (not including) the last
arr.slice(-2);     // [6, 3]  the last two items
```

Negative indexes don't reverse anything: the items come out in their **original order**. They only change where counting starts.

## 4. Out-of-range values are clamped

```js
arr.slice(0, 10); // [3, 4, 4, 5, 6, 3]  end is clamped to the length
arr.slice(10);    // []
arr.slice(4, 2);  // []  start after end gives an empty array
```

## 5. Strings

```js
const str = "Ashutosh";
str.slice(0, 3); // "Ash"  index 3 is not included
str.slice(-4);   // "tosh"
```

## 6. Real-world: pagination

```js
const PAGE_SIZE = 10;
const pageItems = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
```

A page is a position range, and since `end` is exclusive, `page * PAGE_SIZE` lines up exactly with the start of the next page. The last page simply comes back shorter.

## 7. Real-world: "show more" comments

```js
function Comments({ comments }) {
  const [visible, setVisible] = useState(3);
  return (
    <>
      {comments.slice(0, visible).map((c) => <p key={c.id}>{c.text}</p>)}
      {visible < comments.length && <button onClick={() => setVisible((v) => v + 3)}>Show more</button>}
    </>
  );
}
```

The full list stays intact in props; you just render a growing slice of it.

## 8. Real-world: remove an item from React state immutably

```js
setTodos((todos) => [...todos.slice(0, index), ...todos.slice(index + 1)]);
```

Two slices around the index rebuild the array without that item and without mutating state (`splice` would mutate it).

## 9. Real-world: truncate a long title

```js
const short = title.length > 40 ? title.slice(0, 40) + "..." : title;
```

## Comparison

| | `slice(start, end)` | `splice(start, count, ...items)` | `toSpliced(...)` |
| --- | --- | --- | --- |
| Mutates | no | yes | no |
| Second argument | end index (exclusive) | how many to delete | how many to delete |
| Returns | the extracted part | the removed elements | the new full array |

## Gotchas

- `end` is exclusive: `slice(0, 3)` gives 3 items (indexes 0, 1, 2).
- It's a **shallow** copy: objects inside are shared, so `copy[0].name = "x"` changes the original object too.
- `slice` and `splice` differ by one letter but behave very differently; `splice` mutates.
- `slice` doesn't throw for bad indexes; it just returns fewer items or `[]`.

## Interview questions

**1. What's the difference between `slice` and `splice`?**

<details>
<summary>Answer</summary>

`slice(start, end)` returns a new array with part of the original and doesn't mutate. `splice(start, deleteCount, ...items)` changes the original array in place and returns the removed elements.

</details>

**2. What does `[1, 2, 3, 4, 5].slice(-3, -1)` return?**

<details>
<summary>Answer</summary>

`[3, 4]`. `-3` is index 2 and `-1` is index 4 (excluded), so you get indexes 2 and 3 in their normal order.

</details>

**3. How do you copy an array? Is the copy deep?**

<details>
<summary>Answer</summary>

`arr.slice()`, `[...arr]`, `Array.from(arr)` or `arr.concat()`. All are shallow: nested objects are shared. Use `structuredClone(arr)` for a deep copy.

</details>

**4. What does `arr.slice(2, 1)` return?**

<details>
<summary>Answer</summary>

`[]`. When start is at or after end, nothing is selected.

</details>
