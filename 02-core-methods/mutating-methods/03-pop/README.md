# pop

`pop()` removes **one** element from the **end** of an array and returns it. Together with `push` it turns an array into a stack (last in, first out): undo history, a browser back button, matching brackets.

## Syntax

```js
const removed = array.pop();
```

- Takes no arguments.
- **Returns**: the removed element, or `undefined` if the array is empty.

> **Mutates the original array** (length goes down by 1). Non-mutating alternatives: `arr.slice(0, -1)` gives everything except the last item, and `arr.at(-1)` reads the last item without removing it.

## 1. Basic usage

```js
const num = [1, 2, 3, 4];
const last = num.pop();

last; // 4
num;  // [1, 2, 3]

[].pop(); // undefined (no error)
```

## 2. Stack with push / pop

```js
const history = [];
history.push("home");
history.push("products");
history.push("cart");

history.pop(); // "cart"  (go back)
history;       // ["home", "products"]
```

## 3. Real-world example: undo in React state

Do not call `pop` on state directly. Read the last item and create a new array:

```js
const [history, setHistory] = useState(["a", "ab", "abc"]);

function undo() {
  setHistory((prev) => prev.slice(0, -1)); // like pop, but immutable
}
const current = history.at(-1);
```

## 4. Performance

`pop` is **O(1)**: it only removes the last slot, nothing has to move. That is why stacks use `push`/`pop`, while `shift`/`unshift` (front of the array) are O(n).

## Gotchas

- `pop` on an empty array returns `undefined`, which looks the same as popping an element that *was* `undefined`. Check `arr.length` first if that matters.
- `const` arrays can still be popped: `const` stops reassignment, not mutation.
- `pop` returns the removed **element**, not the new array, so `arr = arr.pop()` is a bug.

## Interview questions

**1. What does `pop` return?**

<details>
<summary>Answer</summary>

The removed last element, or `undefined` if the array was empty.

</details>

**2. What is the time complexity of `pop` vs `shift`?**

<details>
<summary>Answer</summary>

`pop` is O(1). `shift` is O(n) because every remaining element has to move down one index.

</details>

**3. How do you remove the last item without mutating the array?**

<details>
<summary>Answer</summary>

`arr.slice(0, -1)` returns a new array without the last item. In React that is the standard way to "pop" from state.

</details>

**4. Implement a stack using an array.**

<details>
<summary>Answer</summary>

Use `push` to add and `pop` to remove. Both work at the end of the array, so both are O(1). Peek with `arr.at(-1)`.

</details>
