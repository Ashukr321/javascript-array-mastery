# entries

`entries()` returns an **iterator** that yields `[index, value]` pairs for every element of the array. It's the cleanest way to get both the index and the value inside a `for...of` loop, where you normally only get the value.

## Syntax

```js
array.entries()
```

- **Parameters:** none.
- **Returns:** a new Array Iterator object that yields `[index, value]` arrays.
- **Mutates:** no. The original array is untouched.

## 1. Index and value in `for...of`

```js
const fruits = ["apple", "banana", "mango"];

for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit);
}
// 0 apple
// 1 banana
// 2 mango
```

## 2. It's an iterator, not an array

```js
const it = fruits.entries();
console.log(it.next()); // { value: [0, "apple"], done: false }
console.log(it.next()); // { value: [1, "banana"], done: false }

// Convert to a real array with spread or Array.from
console.log([...fruits.entries()]); // [[0, "apple"], [1, "banana"], [2, "mango"]]
```

An iterator can only be consumed **once**. Loop over it a second time and you get nothing.

## 3. Holes become `undefined`

Unlike `forEach`, `entries()` visits empty slots:

```js
const sparse = [1, , 3];
console.log([...sparse.entries()]); // [[0, 1], [1, undefined], [2, 3]]
```

## 4. `Array.prototype.entries` vs `Object.entries`

```js
const user = { name: "Asha", age: 25 };
Object.entries(user); // [["name", "Asha"], ["age", 25]]  -> a real array
["a", "b"].entries(); // Array Iterator                   -> spread it first
```

## 5. Real-world: numbered leaderboard from API data (React)

```jsx
function Leaderboard({ players }) {
  const rows = [];
  for (const [i, player] of players.entries()) {
    if (i >= 10) break; // stop early, which forEach can't do
    rows.push(<li key={player.id}>#{i + 1} {player.name}</li>);
  }
  return <ol>{rows}</ol>;
}
```

## Gotchas

- Returns an iterator: `fruits.entries().length` is `undefined`, and array methods like `.map()` aren't available on it. Spread it first.
- Iterators are single-use.
- `entries()` includes holes as `undefined`; `forEach` and `map` skip them.
- Pairs are `[index, value]` (index first), the reverse of `forEach((value, index) => ...)`.

## Interview questions

**1. What does `[10, 20].entries()` return?**

<details>
<summary>Answer</summary>

An Array Iterator, not an array. Iterating it yields `[0, 10]` then `[1, 20]`. Use `[...arr.entries()]` to get `[[0, 10], [1, 20]]`.

</details>

**2. Why use `for (const [i, v] of arr.entries())` instead of `arr.forEach((v, i) => ...)`?**

<details>
<summary>Answer</summary>

`for...of` supports `break`, `continue`, `return` and `await`; `forEach` doesn't. `entries()` also visits holes, which `forEach` skips.

</details>

**3. What happens if you loop over the same `entries()` iterator twice?**

<details>
<summary>Answer</summary>

The second loop does nothing. Iterators are consumed once; call `arr.entries()` again for a fresh one.

</details>

**4. How is `Object.entries(obj)` different from `arr.entries()`?**

<details>
<summary>Answer</summary>

`Object.entries` is a static method that returns a real array of `[key, value]` pairs (keys are strings). `arr.entries()` is an instance method that returns an iterator of `[index, value]` pairs (indexes are numbers).

</details>
