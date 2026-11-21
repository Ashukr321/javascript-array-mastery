// Practice: keys

const colors = ["red", "green", "blue"];

for (const i of colors.keys()) {
  console.log(i, colors[i]);
}

console.log([...colors.keys()]); // [0, 1, 2]

// range helpers
console.log([...Array(5).keys()]); // [0, 1, 2, 3, 4]
console.log([...Array(5).keys()].map((n) => n + 1)); // [1, 2, 3, 4, 5]

// keys() vs Object.keys()
const sparse = ["a", , "c"];
console.log([...sparse.keys()]); // [0, 1, 2]
console.log(Object.keys(sparse)); // ['0', '2']

// pagination page numbers
const totalItems = 23;
const pageSize = 5;
const pages = [...Array(Math.ceil(totalItems / pageSize)).keys()].map((i) => i + 1);
console.log(pages); // [1, 2, 3, 4, 5]

// --- Exercises ---
// 1. Create [0, 2, 4, 6, 8] using Array(5).keys().
// 2. Print only the colors that sit at an even index.
// 3. Write range(start, end) that returns [start, ..., end - 1] using keys().
