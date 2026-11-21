// Practice: flatMap

// Add your practice code here

// array of object
const users = [
    { name: "Ashu", skills: ["js", "react"] },
    { name: "Rahul", skills: ["node"] }
];
  
  // get all skills in one array
  const skills = users.flatMap(user => user.skills);
  
  console.log(skills);
  // ["js", "react", "node"]

//   non mutating methods : 
// just like map but it  you need to return an array 

// ---- More practice ----

// map vs flatMap
const words = ["hi there", "good day"];
console.log(words.map((s) => s.split(" "))); // [['hi', 'there'], ['good', 'day']]
console.log(words.flatMap((s) => s.split(" "))); // ['hi', 'there', 'good', 'day']

// filter + map in one pass
const nums = [1, 2, 3, 4, 5];
console.log(nums.flatMap((n) => (n % 2 === 0 ? [n * 10] : []))); // [20, 40]

// one-to-many
const cart = [
  { item: "pen", qty: 2 },
  { item: "book", qty: 1 },
];
console.log(cart.flatMap((c) => Array(c.qty).fill(c.item))); // ['pen', 'pen', 'book']

// only one level deep
console.log(JSON.stringify([1, 2].flatMap((n) => [[n, n * 2]]))); // [[1,2],[2,4]]

// non-array results are kept as-is
console.log([1, 2].flatMap((n) => n * 2)); // [2, 4]

// strings are not flattened
console.log(["ab"].flatMap((s) => s)); // ['ab']

// unique tags across posts
const posts = [
  { id: 1, tags: ["js", "react"] },
  { id: 2, tags: ["react", "css"] },
];
console.log([...new Set(posts.flatMap((p) => p.tags))]); // ['js', 'react', 'css']

// original is untouched
console.log(users.length); // 2

// --- Exercises ---
// 1. From ["a,b", "c", "d,e,f"], produce ["a", "b", "c", "d", "e", "f"].
// 2. From [{ name, phones: [...] }], get every phone number that starts with "9".
// 3. Duplicate every element: [1, 2, 3] -> [1, 1, 2, 2, 3, 3].
