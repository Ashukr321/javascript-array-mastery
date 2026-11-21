// Practice: deduplication
// Run: node practice.js

// 1. Primitives with Set
const tags = ["js", "css", "js", "html", "css"];
console.log("Set:", [...new Set(tags)]);

// 2. filter + indexOf (O(n^2))
console.log("filter/indexOf:", tags.filter((t, i, arr) => arr.indexOf(t) === i));

// 3. Objects by key: first occurrence wins
const users = [
  { id: 1, name: "Asha" },
  { id: 2, name: "Ravi" },
  { id: 1, name: "Asha (duplicate)" },
];
const seen = new Set();
console.log("first wins:", users.filter((u) => !seen.has(u.id) && seen.add(u.id)));

// 4. Objects by key: last occurrence wins
console.log("last wins:", [...new Map(users.map((u) => [u.id, u])).values()]);

// 5. Composite key
const orders = [
  { userId: 1, productId: 10 },
  { userId: 1, productId: 10 },
  { userId: 1, productId: 11 },
];
const key = (o) => `${o.userId}|${o.productId}`;
console.log("composite:", [...new Map(orders.map((o) => [key(o), o])).values()]);

// 6. NaN gotcha
const withNaN = [1, NaN, NaN, 2];
console.log("Set keeps one NaN:", [...new Set(withNaN)]);
console.log("indexOf drops NaN:", withNaN.filter((x, i, a) => a.indexOf(x) === i));

// --- Exercises ---
// a) Write uniqueBy(arr, keyFn) that keeps the first item per key.
// b) Dedupe ["Apple", "apple ", "BANANA", "banana"] case-insensitively, keeping the original casing.
// c) Merge two arrays of products [{ sku, price }] so each sku appears once and the LOWEST price wins.
