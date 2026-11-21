// Practice: values

const nums = [10, 20, 30];

for (const n of nums.values()) {
  console.log(n);
}

console.log(nums.values === nums[Symbol.iterator]); // true

// manual stepping
const it = nums.values();
console.log(it.next()); // { value: 10, done: false }
console.log(it.next()); // { value: 20, done: false }
console.log(it.next()); // { value: 30, done: false }
console.log(it.next()); // { value: undefined, done: true }

// live iterator
const letters = ["a", "b", "c"];
const it2 = letters.values();
console.log(it2.next().value); // a
letters[1] = "B";
console.log(it2.next().value); // B

// holes
console.log([...[1, , 3].values()]); // [1, undefined, 3]

// iterable into a Set
const products = [
  { id: 1, category: "shoes" },
  { id: 2, category: "bags" },
  { id: 3, category: "shoes" },
];
console.log(new Set(products.map((p) => p.category).values())); // Set { 'shoes', 'bags' }

// same method on Set and Map
console.log([...new Set(["x", "y"]).values()]); // ['x', 'y']
console.log([...new Map([["a", 1], ["b", 2]]).values()]); // [1, 2]

// --- Exercises ---
// 1. Use values() and next() to print only the first two elements of [5, 6, 7, 8].
// 2. Write sumAll(collection) that works for an array AND a Set using .values().
// 3. Explain (in a comment) why for (const x of arr) and arr.values() give the same result.
