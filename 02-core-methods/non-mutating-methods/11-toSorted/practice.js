// Practice: toSorted

const arr = [3,2,3,4,5,5,1];
const sortedArr = arr.toSorted((a,b)=>b-a);

// compare function is the optional function , by this we can sort in ascending or descending order element
 
console.log(sortedArr);
console.log(arr);

// ---- More practice ----
{
  const nums = [3, 20, 100];
  console.log(nums.toSorted()); // [100, 20, 3]  (string sort!)
  console.log(nums.toSorted((a, b) => a - b)); // [3, 20, 100]
  console.log(nums); // [3, 20, 100]  (unchanged)

  // strings
  console.log(["b", "A", "a"].toSorted((a, b) => a.localeCompare(b))); // ["a", "A", "b"]

  // product table views
  const products = [
    { name: "Watch", price: 2499, addedAt: "2024-03-10" },
    { name: "Shoes", price: 1299, addedAt: "2024-05-01" },
    { name: "bag", price: 899, addedAt: "2024-01-20" },
  ];
  console.log(products.toSorted((a, b) => a.price - b.price).map((p) => p.name)); // ["bag", "Shoes", "Watch"]
  console.log(products.toSorted((a, b) => a.name.localeCompare(b.name)).map((p) => p.name)); // ["bag", "Shoes", "Watch"]
  console.log(products.toSorted((a, b) => new Date(b.addedAt) - new Date(a.addedAt)).map((p) => p.name)); // ["Shoes", "Watch", "bag"]
  console.log(products[0].name); // "Watch"

  // React-style state update
  let todos = [{ t: "b", priority: 2 }, { t: "a", priority: 1 }];
  const prev = todos;
  todos = todos.toSorted((a, b) => a.priority - b.priority);
  console.log(todos.map((x) => x.t), prev === todos); // ["a", "b"] false

  // leaderboard top 3
  const scores = [72, 95, 88, 60, 99];
  console.log(scores.toSorted((a, b) => b - a).slice(0, 3)); // [99, 95, 88]
  console.log(scores); // [72, 95, 88, 60, 99]

  // holes become undefined and go to the end
  console.log([3, , 1].toSorted()); // [1, 3, undefined]
}

// --- Exercises ---
// 1. Sort an array of dates (ISO strings) oldest first without mutating it.
// 2. Given users with { name, age }, return a new array sorted by age, then name.
// 3. Return the median of an array of numbers without changing the original (use toSorted).
