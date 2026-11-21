// Practice: filtering data
// Run: node practice.js

const products = [
  { name: "Laptop", price: 900, category: "tech", inStock: true },
  { name: "Mouse", price: 25, category: "tech", inStock: false },
  { name: "Desk", price: 300, category: "furniture", inStock: true },
  { name: "Chair", price: 150, category: "furniture", inStock: true },
];

// 1. Single condition
console.log("in stock:", products.filter((p) => p.inStock).map((p) => p.name));

// 2. UI-driven filters (empty value = no filter)
function applyFilters(list, { category, maxPrice, inStockOnly }) {
  return list.filter(
    (p) =>
      (!category || p.category === category) &&
      (maxPrice == null || p.price <= maxPrice) &&
      (!inStockOnly || p.inStock),
  );
}
console.log("tech, in stock:", applyFilters(products, { category: "tech", inStockOnly: true }).map((p) => p.name));
console.log("no filters:", applyFilters(products, {}).length);

// 3. Composable predicates
const byCategory = (c) => (p) => !c || p.category === c;
const byMaxPrice = (max) => (p) => max == null || p.price <= max;
const predicates = [byCategory("furniture"), byMaxPrice(200)];
console.log("composed:", products.filter((p) => predicates.every((t) => t(p))).map((p) => p.name));

// 4. Filter + reduce
console.log("stock value:", products.filter((p) => p.inStock).reduce((s, p) => s + p.price, 0));

// 5. Falsy gotcha
console.log([0, 1, "", "a", null, undefined].filter((x) => x)); // [1, "a"]
console.log([0, 1, "", "a", null, undefined].filter((x) => x != null)); // [0, 1, "", "a"]

// --- Exercises ---
// a) Add a `search` filter that matches product names case-insensitively.
// b) Support multi-select categories: { categories: ["tech", "furniture"] }.
// c) Write filterAny(list, predicates) that keeps items matching AT LEAST ONE predicate.
