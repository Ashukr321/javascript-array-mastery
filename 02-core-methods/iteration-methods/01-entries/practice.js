// Practice: entries

const fruits = ["apple", "banana", "mango"];

// index + value in for...of
for (const [index, fruit] of fruits.entries()) {
  console.log(index, fruit);
}

// it's an iterator
const it = fruits.entries();
console.log(it.next()); // { value: [0, 'apple'], done: false }
console.log(it.next()); // { value: [1, 'banana'], done: false }

// convert to array
console.log([...fruits.entries()]);

// single use
const once = fruits.entries();
console.log([...once].length); // 3
console.log([...once].length); // 0

// holes become undefined
console.log([...[1, , 3].entries()]); // [[0, 1], [1, undefined], [2, 3]]

// Object.entries vs Array entries
console.log(Object.entries({ name: "Asha", age: 25 }));

// break early (top 2 only)
const players = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ravi" },
  { id: 3, name: "Meera" },
];
for (const [i, p] of players.entries()) {
  if (i >= 2) break;
  console.log(`#${i + 1} ${p.name}`);
}

// --- Exercises ---
// 1. Print "1. apple", "2. banana", "3. mango" using entries().
// 2. Find the index of the first player whose name starts with "M" using entries() and break.
// 3. Build an object { 0: "apple", 1: "banana", 2: "mango" } from fruits.entries()
//    (hint: Object.fromEntries).
