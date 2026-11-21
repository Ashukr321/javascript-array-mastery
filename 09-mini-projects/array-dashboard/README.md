# Array Dashboard

Build a small **sales dashboard** from a raw array of orders: KPI cards, revenue by category, a monthly trend and top customers. Every number comes from `filter`, `map`, `reduce`, `Set` and `toSorted`, with no libraries.

- `practice.js`: the logic, printed as a dashboard in the terminal (`node practice.js`).
- `index.html`: the same logic rendered in the browser (embedded below).

## What you'll practise

| Feature | Array skills |
|---|---|
| Ignore cancelled orders | `filter` |
| Total revenue, items sold | `reduce` |
| Unique customers | `map` + `Set` |
| Revenue by category / month / customer | `reduce` into an object (group-by) |
| Ranking, top 3 | `Object.entries` + `toSorted` + `slice` |
| Best product | `reduce` to find a max |
| Month-over-month growth | `map` with the index to read the previous item |

## The data

```js
const orders = [
  { id: 1, customer: "Asha", product: "Laptop", category: "Electronics", qty: 1, price: 900, date: "2024-01-05", status: "delivered" },
  { id: 4, customer: "Asha", product: "Chair", category: "Furniture", qty: 2, price: 150, date: "2024-02-18", status: "cancelled" },
  // ...
];
```

Each order has a quantity and unit price, so its value is `qty * price`.

## Step 1: clean the data

Decide what counts. Cancelled orders shouldn't add to revenue:

```js
const valid = orders.filter((o) => o.status !== "cancelled");
const amount = (o) => o.qty * o.price;
```

Every later step works on `valid`, so the rule lives in one place.

## Step 2: KPI cards

```js
const revenue = valid.reduce((sum, o) => sum + amount(o), 0);
const kpis = {
  orders: valid.length,
  revenue,
  averageOrder: valid.length ? revenue / valid.length : 0, // avoid divide-by-zero
  itemsSold: valid.reduce((sum, o) => sum + o.qty, 0),
  customers: new Set(valid.map((o) => o.customer)).size,
};
```

## Step 3: group and sum

One helper powers three charts:

```js
const sumBy = (list, keyFn) =>
  list.reduce((acc, o) => {
    const k = keyFn(o);
    acc[k] = (acc[k] ?? 0) + amount(o);
    return acc;
  }, {});

sumBy(valid, (o) => o.category); // { Electronics: 2365, Furniture: 300, Stationery: 70 }
sumBy(valid, (o) => o.date.slice(0, 7)); // by "YYYY-MM"
sumBy(valid, (o) => o.customer);
```

On Node 21+ / modern browsers you can write `Object.groupBy(valid, (o) => o.category)` and then reduce each group.

## Step 4: rank

Objects aren't ordered by value, so convert to `[key, value]` pairs and sort:

```js
const byCategory = Object.entries(sumBy(valid, (o) => o.category)).toSorted((a, b) => b[1] - a[1]);
const topCustomers = Object.entries(sumBy(valid, (o) => o.customer))
  .toSorted((a, b) => b[1] - a[1])
  .slice(0, 3);
```

Find a single maximum without sorting:

```js
const bestProduct = Object.entries(sumBy(valid, (o) => o.product)).reduce((best, cur) => (cur[1] > best[1] ? cur : best));
```

## Step 5: trend with growth

`map` gives you the index, so each month can compare itself to the previous one:

```js
const growth = byMonth.map(([month, total], i) => ({
  month,
  total,
  change: i === 0 ? null : Math.round(((total - byMonth[i - 1][1]) / byMonth[i - 1][1]) * 100),
}));
```

## Step 6: render

In the terminal, bars are just repeated characters scaled to the largest value:

```js
const bar = (value, max, width = 30) => "█".repeat(Math.round((value / max) * width));
```

In `index.html` the same numbers become `<div>`s whose width is a percentage of the maximum. Changing the **status filter** re-runs the whole pipeline: the data stays the same and every view is recomputed from it.

## Expected output (terminal)

```
=== Revenue by category ===
Electronics  ██████████████████████████████ $2365.00
Furniture    ████                           $300.00
Stationery   █                              $70.00
```

## Extensions

1. Add a date-range filter (from/to) that runs before every calculation.
2. Show revenue split by status (delivered vs pending).
3. Let the user pick "Top N" customers.
4. Replace `sumBy` with `Object.groupBy` and compare the code.
