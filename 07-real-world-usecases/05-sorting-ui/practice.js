// Practice: sorting UI
// Run: node practice.js

const products = [
  { name: "Item 10", category: "tech", price: 25, createdAt: "2024-03-01" },
  { name: "item 2", category: "furniture", price: 150, createdAt: "2024-01-15" },
  { name: "Écran", category: "tech", price: 200, createdAt: "2024-02-10" },
  { name: "Desk", category: "furniture", price: null, createdAt: "2024-04-20" },
];

const byNumber = (key) => (a, b) => a[key] - b[key];
const byText = (key) => (a, b) => a[key].localeCompare(b[key], undefined, { sensitivity: "base", numeric: true });
const byDate = (key) => (a, b) => new Date(a[key]) - new Date(b[key]);
const withDirection = (compare, dir) => (dir === "asc" ? compare : (a, b) => compare(b, a));
const nullsLast = (key, compare) => (a, b) =>
  a[key] == null ? (b[key] == null ? 0 : 1) : b[key] == null ? -1 : compare(a, b);
const thenBy = (...cs) => (a, b) => {
  for (const c of cs) {
    const r = c(a, b);
    if (r !== 0) return r;
  }
  return 0;
};

const names = (list) => list.map((p) => p.name);

console.log("default sort (strings!):", [10, 1, 5, 100].toSorted());
console.log("numeric:", [10, 1, 5, 100].toSorted((a, b) => a - b));
console.log("name asc:", names(products.toSorted(byText("name"))));
console.log("price asc, nulls last:", names(products.toSorted(nullsLast("price", byNumber("price")))));
console.log("newest first:", names(products.toSorted(withDirection(byDate("createdAt"), "desc"))));
console.log("category then price:", names(products.toSorted(thenBy(byText("category"), nullsLast("price", byNumber("price"))))));
console.log("original untouched:", names(products));

// Header click toggling
let sortState = { key: "price", dir: "asc" };
const onHeaderClick = (key) =>
  (sortState = sortState.key === key ? { key, dir: sortState.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" });
onHeaderClick("price");
console.log(sortState); // { key: "price", dir: "desc" }
onHeaderClick("name");
console.log(sortState); // { key: "name", dir: "asc" }

// --- Exercises ---
// a) Make nullsLast keep nulls last in BOTH directions.
// b) Build a SORTS map for a <select> with "price-asc", "price-desc", "name-asc", "newest".
// c) Sort ["file10.txt", "file2.txt", "File1.txt"] naturally and case-insensitively.
