# Filtering Data

Almost every UI shows a **filtered** view of some data: in-stock products, active users, orders from last month. In JavaScript that is `Array.prototype.filter`, plus a few patterns that keep the code readable when filters stack up.

## The basics

`filter` returns a **new array** containing the elements for which the callback returns a truthy value. The original array is not changed.

```js
const products = [
  { name: "Laptop", price: 900, category: "tech", inStock: true },
  { name: "Mouse", price: 25, category: "tech", inStock: false },
  { name: "Desk", price: 300, category: "furniture", inStock: true },
  { name: "Chair", price: 150, category: "furniture", inStock: true },
];

const inStock = products.filter((p) => p.inStock);
const cheap = products.filter((p) => p.price < 200);
```

## Combining conditions

Put several conditions in one callback with `&&` / `||`:

```js
const cheapFurniture = products.filter((p) => p.category === "furniture" && p.price < 200);
```

## Filters driven by UI state

In a real app the filters come from form controls, and an **empty value means "no filter"**:

```js
const filters = { category: "tech", maxPrice: null, inStockOnly: true };

const visible = products.filter(
  (p) =>
    (!filters.category || p.category === filters.category) &&
    (filters.maxPrice == null || p.price <= filters.maxPrice) &&
    (!filters.inStockOnly || p.inStock),
);
```

## Composable predicates

When the number of filters grows, write each one as a small function and combine them with `every`:

```js
const byCategory = (c) => (p) => !c || p.category === c;
const byMaxPrice = (max) => (p) => max == null || p.price <= max;
const byStock = (only) => (p) => !only || p.inStock;

const predicates = [byCategory("furniture"), byMaxPrice(400), byStock(true)];
const result = products.filter((p) => predicates.every((test) => test(p)));
```

Swap `every` for `some` to get "match ANY filter" (OR) instead of "match ALL" (AND).

## Multi-select filters

For checkbox groups, test membership with `includes` (or a `Set` for large lists):

```js
const selected = ["tech", "furniture"];
const matches = products.filter((p) => selected.length === 0 || selected.includes(p.category));
```

## Filter, then transform

`filter` is usually followed by `map` or `reduce`:

```js
const total = products
  .filter((p) => p.inStock)
  .reduce((sum, p) => sum + p.price, 0); // 1350
```

## Related methods

| Need | Method | Returns |
|---|---|---|
| All matching items | `filter` | new array (maybe empty) |
| First matching item | `find` | item or `undefined` |
| Position of first match | `findIndex` | index or `-1` |
| Is there any match? | `some` | boolean |
| Do all items match? | `every` | boolean |

Use `find`/`some` instead of `filter(...)[0]` or `filter(...).length > 0`: they stop at the first match.

## Gotchas

- Return a boolean. `filter((p) => { p.inStock })` (with braces, no `return`) returns `undefined`, so the result is always empty.
- `filter((x) => x)` removes **all** falsy values, including `0` and `""`. Use `filter((x) => x != null)` to remove only `null`/`undefined`.
- `filter` skips holes in sparse arrays.
