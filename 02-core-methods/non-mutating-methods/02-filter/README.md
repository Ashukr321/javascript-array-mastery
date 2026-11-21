# filter

`filter()` creates a **new array** containing only the elements that pass a test. It's a **higher-order function (HOF)**: you pass it a callback, each item of the array goes through that callback, and if the condition returns `true` (truthy) the item is added to the newly created array, which is then returned. It **doesn't mutate** the original array, which is why it's so widely used in React applications for filtering data.

## Syntax

```js
array.filter((currentElement, index, array) => {
  // return true to keep the element
}, thisArg)
```

- `currentElement`: the element being processed.
- `index` (optional): the current index of the element.
- `array` (optional): the array `filter` was called on.
- `thisArg` (optional): value used as `this` inside a regular-function callback.
- **Returns:** a new array with the elements that passed (possibly empty, never `undefined`).
- **Mutates:** no.

## 1. Basic filtering

```js
const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter((n) => n % 2 === 0); // [2, 4, 6]
console.log(nums); // [1, 2, 3, 4, 5, 6]  unchanged
```

## 2. Array of objects

```js
const users = [
  { name: "ASHUTOSH", age: 21 },
  { name: "amit", age: 17 },
  { name: "sumit", age: 25 },
];

const adults = users.filter((user) => user.age >= 18);
// [{ name: "ASHUTOSH", age: 21 }, { name: "sumit", age: 25 }]
```

## 3. Using `index` and `array`

```js
// remove duplicates: keep only the first occurrence
const tags = ["js", "css", "js"];
tags.filter((tag, i, arr) => arr.indexOf(tag) === i); // ["js", "css"]

// every other item
nums.filter((_, i) => i % 2 === 0); // [1, 3, 5]
```

## 4. Remove falsy values

```js
[0, "hi", "", null, 42, undefined, NaN].filter(Boolean); // ["hi", 42]
```

## 5. Chaining with `map`

```js
const names = users.filter((u) => u.age >= 18).map((u) => u.name); // ["ASHUTOSH", "sumit"]
```

## 6. Real-world: search and delete in React

```jsx
function UserList({ users }) {
  const [query, setQuery] = useState("");
  const [onlyActive, setOnlyActive] = useState(false);

  const visible = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.trim().toLowerCase()) &&
      (!onlyActive || u.active)
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <label>
        <input type="checkbox" checked={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />
        Active only
      </label>
      <ul>{visible.map((u) => <li key={u.id}>{u.name}</li>)}</ul>
    </>
  );
}
```

Deleting an item from state without mutating it:

```js
setTodos((todos) => todos.filter((t) => t.id !== idToDelete));
```

## Gotchas

- The callback must **return** a value. `nums.filter((n) => { n > 2 })` (braces, no `return`) gives `[]`.
- It's a **shallow** copy: kept objects are the same references, so changing `adults[0].age` also changes `users[0]`.
- Truthy/falsy, not strict booleans: returning `0` or `""` drops the item.
- Holes in sparse arrays are skipped and never appear in the result.
- Need just the first match? Use `find()`: `filter` always walks the whole array and returns an array.

## Interview questions

**1. Does `filter` mutate the original array?**

<details>
<summary>Answer</summary>

No. It returns a new array. However, the objects inside are the same references (shallow copy), so mutating a returned object changes the original object too.

</details>

**2. What's the difference between `filter` and `find`?**

<details>
<summary>Answer</summary>

`filter` returns an array of all matching elements (an empty array if none). `find` returns the first matching element itself, or `undefined`, and stops as soon as it finds one.

</details>

**3. What does `arr.filter(Boolean)` do?**

<details>
<summary>Answer</summary>

It removes all falsy values (`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`), because `Boolean` is called on each element and only truthy ones are kept.

</details>

**4. Implement your own `filter` polyfill.**

<details>
<summary>Answer</summary>

```js
Array.prototype.myFilter = function (cb, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && cb.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
```

</details>
