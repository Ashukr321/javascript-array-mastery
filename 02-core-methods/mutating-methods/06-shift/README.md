# shift

`shift()` removes the **first** element of an array and returns it. Combined with `push`, it turns an array into a queue (first in, first out): task queues, message processing, breadth-first search.

## Syntax

```js
const removed = array.shift();
```

- Takes no arguments.
- **Returns**: the removed first element, or `undefined` if the array is empty.

> **Mutates the original array**: length drops by 1 and every other element moves down one index. Non-mutating alternative: `arr.slice(1)` (or `const [first, ...rest] = arr`).

## 1. Basic usage

```js
const num = [1, 2, 3];
num.shift(); // 1
num;         // [2, 3]

[].shift();  // undefined
```

## 2. Queue with push / shift

```js
const queue = [];
queue.push("job1");
queue.push("job2");
queue.push("job3");

queue.shift(); // "job1"  (first in, first out)
queue;         // ["job2", "job3"]
```

## 3. Real-world example: toast notifications in React

Show toasts in order and drop the oldest one, immutably:

```js
const [toasts, setToasts] = useState([]);

function dismissOldest() {
  setToasts((prev) => prev.slice(1)); // like shift, but returns a new array
}
```

## 4. Performance

`shift` is **O(n)**: after removing index 0, every remaining element has to be re-indexed. `pop` (end of the array) is O(1). For big queues processed in a loop, keep a head index instead of calling `shift` repeatedly:

```js
let head = 0;
while (head < queue.length) {
  const job = queue[head++];
  // process job
}
```

## Gotchas

- Returns the removed element, not the array, so `arr = arr.shift()` is a bug.
- An empty array returns `undefined` with no error.
- Calling `shift` inside a `for` loop over the same array skips elements because the indexes keep moving.

## Interview questions

**1. What is the difference between `shift` and `pop`?**

<details>
<summary>Answer</summary>

`shift` removes from the start (O(n), everything re-indexes); `pop` removes from the end (O(1)). Both mutate and return the removed element.

</details>

**2. How would you implement a queue with an array?**

<details>
<summary>Answer</summary>

`push` to enqueue and `shift` to dequeue. For large queues, avoid the `shift` cost by tracking a head index or using a linked list.

</details>

**3. How do you remove the first element without mutating?**

<details>
<summary>Answer</summary>

`arr.slice(1)`, or destructuring: `const [first, ...rest] = arr`.

</details>
