// Practice: array recipes
// Run: node practice.js

const products = [
  { name: "Laptop", category: "tech", price: 900 },
  { name: "Shirt", category: "fashion", price: 30 },
  { name: "Phone", category: "tech", price: 600 },
];

// 1. groupBy
const groupBy = (arr, fn) =>
  arr.reduce((acc, x) => {
    (acc[fn(x)] ??= []).push(x);
    return acc;
  }, {});
// Object.groupBy needs Node 21+; fall back to the reduce version otherwise
const byCategory = Object.groupBy ? Object.groupBy(products, (p) => p.category) : groupBy(products, (p) => p.category);
console.log("groupBy:", byCategory);

// 2. chunk
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size));
console.log("chunk:", chunk([1, 2, 3, 4, 5], 2));

// 3. zip
const zip = (...arrays) =>
  Array.from({ length: Math.min(...arrays.map((a) => a.length)) }, (_, i) => arrays.map((a) => a[i]));
console.log("zip:", zip(["a", "b", "c"], [1, 2, 3]), Object.fromEntries(zip(["id", "name"], [7, "Asha"])));

// 4. partition
const partition = (arr, fn) => arr.reduce((acc, x) => (acc[fn(x) ? 0 : 1].push(x), acc), [[], []]);
const [even, odd] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
console.log("partition:", even, odd);

// 5. range
const range = (start, end, step = 1) =>
  Array.from({ length: Math.max(0, Math.ceil((end - start) / step)) }, (_, i) => start + i * step);
console.log("range:", range(0, 5), range(0, 10, 3), range(5, 0, -1));

// 6. shuffle (Fisher-Yates)
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const deck = [1, 2, 3, 4, 5];
const shuffled = shuffle(deck);
console.log("shuffle:", shuffled, "original untouched:", deck);

// 7. sumBy / avgBy
const sumBy = (arr, fn) => arr.reduce((total, x) => total + fn(x), 0);
const avgBy = (arr, fn) => (arr.length ? sumBy(arr, fn) / arr.length : 0);
console.log("sumBy:", sumBy(products, (p) => p.price), "avgBy:", avgBy(products, (p) => p.price));

// 8. countBy
const countBy = (arr, fn) =>
  arr.reduce((acc, x) => {
    const k = fn(x);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
console.log("countBy:", countBy(products, (p) => p.category), countBy(["a", "bb", "cc"], (s) => s.length));

// 9. uniqueBy
const uniqueBy = (arr, fn) => {
  const seen = new Set();
  return arr.filter((x) => {
    const k = fn(x);
    return !seen.has(k) && seen.add(k);
  });
};
console.log("uniqueBy:", uniqueBy([{ id: 1 }, { id: 2 }, { id: 1 }], (u) => u.id));

// 10. sort by multiple keys (toSorted needs Node 20+; [...arr].sort is the fallback)
const people = [
  { name: "Ravi", dept: "eng", age: 30 },
  { name: "Asha", dept: "eng", age: 25 },
  { name: "Meera", dept: "hr", age: 28 },
];
const sorted = [...people].sort((a, b) => a.dept.localeCompare(b.dept) || b.age - a.age);
console.log("multi-sort:", sorted.map((p) => `${p.name} (${p.dept}, ${p.age})`));

// 11. compact
const compact = (arr) => arr.filter(Boolean);
const withoutNullish = (arr) => arr.filter((x) => x != null);
const messy = [0, 1, "", "a", null, undefined, NaN, false, 2];
console.log("compact:", compact(messy), "withoutNullish:", withoutNullish(messy));

// 12. difference / intersection / union
const difference = (a, b) => {
  const B = new Set(b);
  return a.filter((x) => !B.has(x));
};
const intersection = (a, b) => {
  const B = new Set(b);
  return a.filter((x) => B.has(x));
};
const union = (a, b) => [...new Set([...a, ...b])];
console.log("difference:", difference([1, 2, 3, 4], [2, 4]));
console.log("intersection:", intersection([1, 2, 3, 4], [2, 4, 6]));
console.log("union:", union([1, 2], [2, 3]));

// Checks
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
console.assert(eq(Object.keys(byCategory), ["tech", "fashion"]) && byCategory.tech.length === 2, "groupBy");
console.assert(eq(groupBy(products, (p) => p.category).fashion.map((p) => p.name), ["Shirt"]), "groupBy fallback");
console.assert(eq(chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]), "chunk");
console.assert(eq(chunk([], 3), []), "chunk empty");
console.assert(eq(zip(["a", "b", "c"], [1, 2]), [["a", 1], ["b", 2]]), "zip uneven");
console.assert(eq(even, [2, 4]) && eq(odd, [1, 3, 5]), "partition");
console.assert(eq(range(0, 5), [0, 1, 2, 3, 4]) && eq(range(0, 10, 3), [0, 3, 6, 9]), "range");
console.assert(eq(range(5, 0, -1), [5, 4, 3, 2, 1]) && eq(range(3, 3), []), "range reverse/empty");
console.assert(shuffled.length === 5 && eq([...shuffled].sort(), [1, 2, 3, 4, 5]) && eq(deck, [1, 2, 3, 4, 5]), "shuffle");
console.assert(sumBy(products, (p) => p.price) === 1530 && avgBy(products, (p) => p.price) === 510, "sumBy/avgBy");
console.assert(avgBy([], (x) => x) === 0, "avgBy empty");
console.assert(eq(countBy(products, (p) => p.category), { tech: 2, fashion: 1 }), "countBy");
console.assert(eq(uniqueBy([{ id: 1, v: "a" }, { id: 2 }, { id: 1, v: "b" }], (u) => u.id), [{ id: 1, v: "a" }, { id: 2 }]), "uniqueBy");
console.assert(eq(sorted.map((p) => p.name), ["Ravi", "Asha", "Meera"]), "multi-sort");
console.assert(eq(compact(messy), [1, "a", 2]), "compact");
console.assert(withoutNullish(messy).length === 7, "withoutNullish keeps 0, '', NaN, false");
console.assert(eq(difference([1, 2, 3, 4], [2, 4]), [1, 3]), "difference");
console.assert(eq(intersection([1, 2, 3, 4], [2, 4, 6]), [2, 4]), "intersection");
console.assert(eq(union([1, 2], [2, 3]), [1, 2, 3]), "union");

// Fisher-Yates is unbiased: each of the 6 orders of [1,2,3] should show up ~1/6 of the time
const tally = countBy(Array.from({ length: 60000 }, () => shuffle([1, 2, 3]).join("")), (s) => s);
console.log("shuffle distribution (expect ~10000 each):", tally);
console.assert(Object.values(tally).length === 6 && Object.values(tally).every((n) => n > 9000 && n < 11000), "shuffle fairness");
console.log("All recipe checks ran (no assertion errors above = pass).");

// --- Exercises ---
// a) Write keyBy(arr, fn) that turns [{ id: 1 }, { id: 2 }] into { 1: { id: 1 }, 2: { id: 2 } }.
// b) Write sample(arr, n) that returns n random items without repeats (hint: partial Fisher-Yates).
// c) Write symmetricDifference(a, b): items in exactly one of the two arrays ([1,2,3], [2,3,4] -> [1,4]).
