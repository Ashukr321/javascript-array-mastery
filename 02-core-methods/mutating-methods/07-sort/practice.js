// sort methods 


let arr = [3, 1, 4, 1, 5];

// internal working we need to understand how it work 
const sortedArr = [...arr].sort((a, b) => a - b); // without mutating the original array we sort the element of the array 

// [...arr]; shallow copy of the array element 


console.log(sortedArr);  

// ---- More practice ----
{
  // default sort is a STRING sort
  console.log([10, 1, 5, 100].sort()); // [1, 10, 100, 5]
  console.log([10, 1, 5, 100].sort((a, b) => a - b)); // [1, 5, 10, 100]
  console.log(["b", "B", "a"].sort()); // ["B", "a", "b"]

  // sort returns the SAME array
  const nums = [3, 1, 2];
  console.log(nums.sort((a, b) => a - b) === nums); // true

  // product table: sort by price, name, date (copy first)
  const products = [
    { name: "Watch", price: 2499, addedAt: "2024-03-10" },
    { name: "Shoes", price: 1299, addedAt: "2024-05-01" },
    { name: "bag", price: 1299, addedAt: "2024-01-20" },
  ];
  const comparators = {
    price: (a, b) => a.price - b.price,
    name: (a, b) => a.name.localeCompare(b.name),
    date: (a, b) => new Date(b.addedAt) - new Date(a.addedAt),
  };
  const sortProducts = (list, key) => [...list].sort(comparators[key]);
  console.log(sortProducts(products, "price").map((p) => p.name)); // ["Shoes", "bag", "Watch"] (stable: Shoes stays before bag)
  console.log(sortProducts(products, "name").map((p) => p.name)); // ["bag", "Shoes", "Watch"]
  console.log(sortProducts(products, "date").map((p) => p.name)); // ["Shoes", "Watch", "bag"]
  console.log(products[0].name); // "Watch" (original untouched)

  // React-style state update
  let todos = [{ t: "b", priority: 2 }, { t: "a", priority: 1 }];
  todos = [...todos].sort((a, b) => a.priority - b.priority);
  console.log(todos.map((x) => x.t)); // ["a", "b"]

  // multi-key sort with a tie breaker
  const users = [
    { name: "Neha", age: 25 },
    { name: "Ashu", age: 25 },
    { name: "Rahul", age: 22 },
  ];
  users.sort((a, b) => a.age - b.age || a.name.localeCompare(b.name));
  console.log(users.map((u) => u.name)); // ["Rahul", "Ashu", "Neha"]

  // natural sort for file names
  console.log(["file10", "file2", "file1"].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })));
  // ["file1", "file2", "file10"]
}

// --- Exercises ---
// 1. Sort ["Banana", "apple", "cherry"] alphabetically ignoring case, without mutating the original.
// 2. Sort an array of { name, price } by price descending, then by name ascending for equal prices.
// 3. Implement bubble sort yourself and compare its result with arr.sort((a, b) => a - b).
