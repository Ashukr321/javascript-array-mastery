// Mini project: Array Dashboard
// Turns a raw array of orders into dashboard numbers using only array methods.
// Run: node practice.js

const orders = [
  { id: 1, customer: "Asha", product: "Laptop", category: "Electronics", qty: 1, price: 900, date: "2024-01-05", status: "delivered" },
  { id: 2, customer: "Ravi", product: "Mouse", category: "Electronics", qty: 3, price: 25, date: "2024-01-12", status: "delivered" },
  { id: 3, customer: "Meera", product: "Desk", category: "Furniture", qty: 1, price: 300, date: "2024-02-02", status: "delivered" },
  { id: 4, customer: "Asha", product: "Chair", category: "Furniture", qty: 2, price: 150, date: "2024-02-18", status: "cancelled" },
  { id: 5, customer: "John", product: "Monitor", category: "Electronics", qty: 2, price: 220, date: "2024-03-03", status: "delivered" },
  { id: 6, customer: "Ravi", product: "Notebook", category: "Stationery", qty: 10, price: 4, date: "2024-03-09", status: "delivered" },
  { id: 7, customer: "Meera", product: "Laptop", category: "Electronics", qty: 1, price: 950, date: "2024-03-21", status: "pending" },
  { id: 8, customer: "John", product: "Pen", category: "Stationery", qty: 20, price: 1.5, date: "2024-03-28", status: "delivered" },
];

// 1. Only count orders that weren't cancelled
const valid = orders.filter((o) => o.status !== "cancelled");
const amount = (o) => o.qty * o.price;

// 2. KPIs
const revenue = valid.reduce((sum, o) => sum + amount(o), 0);
const kpis = {
  orders: valid.length,
  revenue,
  averageOrder: valid.length ? revenue / valid.length : 0,
  itemsSold: valid.reduce((sum, o) => sum + o.qty, 0),
  customers: new Set(valid.map((o) => o.customer)).size,
  pending: orders.filter((o) => o.status === "pending").length,
};

// 3. Group + sum helper (works everywhere; Object.groupBy is the ES2024 shortcut)
const sumBy = (list, keyFn) =>
  list.reduce((acc, o) => {
    const k = keyFn(o);
    acc[k] = (acc[k] ?? 0) + amount(o);
    return acc;
  }, {});

const byCategory = Object.entries(sumBy(valid, (o) => o.category)).toSorted((a, b) => b[1] - a[1]);
const byMonth = Object.entries(sumBy(valid, (o) => o.date.slice(0, 7))).toSorted(([a], [b]) => a.localeCompare(b));
const topCustomers = Object.entries(sumBy(valid, (o) => o.customer))
  .toSorted((a, b) => b[1] - a[1])
  .slice(0, 3);
const bestProduct = Object.entries(sumBy(valid, (o) => o.product)).reduce((best, cur) => (cur[1] > best[1] ? cur : best));

// 4. Month-over-month growth
const growth = byMonth.map(([month, total], i) => ({
  month,
  total,
  change: i === 0 ? null : Math.round(((total - byMonth[i - 1][1]) / byMonth[i - 1][1]) * 100),
}));

// 5. Print the dashboard
const money = (n) => "$" + n.toFixed(2);
const bar = (value, max, width = 30) => "█".repeat(Math.round((value / max) * width));

console.log("=== KPIs ===");
console.table({ ...kpis, revenue: money(kpis.revenue), averageOrder: money(kpis.averageOrder) });

console.log("\n=== Revenue by category ===");
const maxCat = Math.max(...byCategory.map(([, v]) => v));
byCategory.forEach(([cat, v]) => console.log(cat.padEnd(12), bar(v, maxCat).padEnd(30), money(v)));

console.log("\n=== Monthly trend ===");
growth.forEach((g) => console.log(g.month, money(g.total).padStart(10), g.change == null ? "" : `${g.change > 0 ? "+" : ""}${g.change}%`));

console.log("\n=== Top customers ===");
topCustomers.forEach(([name, v], i) => console.log(`${i + 1}. ${name} — ${money(v)}`));

console.log("\nBest product:", bestProduct[0], money(bestProduct[1]));

// --- Extensions ---
// a) Add a date-range filter (from/to) applied before every calculation.
// b) Show revenue by status (delivered vs pending).
// c) Replace sumBy with Object.groupBy + reduce (Node 21+).
