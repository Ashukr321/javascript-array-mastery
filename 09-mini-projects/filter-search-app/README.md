# Filter & Search App

Build a **product catalogue** with a search box, category and brand filters, a price range, an in-stock toggle, sorting and pagination. It combines every topic from Real World Use Cases into one app.

- `practice.js`: the logic as pure functions, with a simulated user session (`node practice.js`).
- `index.html`: the working UI (embedded below).

## Architecture: state in, view out

The whole app is one idea: **the UI state is a plain object, and one pure function turns `(products, state)` into what to render.**

```js
const state = {
  query: "",
  categories: [], // empty = all
  brands: [],
  minPrice: null,
  maxPrice: null,
  inStockOnly: false,
  sort: "relevance",
  page: 1,
  pageSize: 4,
};

const view = getView(products, state); // { items, total, page, totalPages, categoryCounts, priceRange }
```

Event handlers only update `state`, then call `render()`. Nothing else mutates anything, which makes the logic easy to test (see `practice.js`).

## The pipeline

Order matters: **search → filter → sort → paginate**.

```js
function getView(list, state) {
  const words = fold(state.query).split(/\s+/).filter(Boolean);

  const filtered = list.filter(
    (p) =>
      words.every((w) => p._search.includes(w)) && // search: every word must match
      (state.categories.length === 0 || state.categories.includes(p.category)) &&
      (state.brands.length === 0 || state.brands.includes(p.brand)) &&
      (state.minPrice == null || p.price >= state.minPrice) &&
      (state.maxPrice == null || p.price <= state.maxPrice) &&
      (!state.inStockOnly || p.inStock),
  );

  const sorted = filtered.toSorted(SORTS[state.sort]); // never mutate the source list

  const totalPages = Math.max(1, Math.ceil(sorted.length / state.pageSize));
  const page = Math.min(Math.max(1, state.page), totalPages); // clamp
  const start = (page - 1) * state.pageSize;

  return { items: sorted.slice(start, start + state.pageSize), total: sorted.length, page, totalPages };
}
```

## Step-by-step

### 1. Pre-compute search text

Build each product's searchable string once, not on every keystroke:

```js
const fold = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const indexed = products.map((p) => ({ ...p, _search: fold(`${p.name} ${p.brand} ${p.category}`) }));
```

### 2. Multi-select filters

Checkbox groups store an array; toggling adds or removes a value immutably:

```js
const toggle = (arr, value) => (arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
```

An empty array means "no filter", so the first render shows everything.

### 3. Sorting

A lookup table maps the `<select>` value to a comparator:

```js
const SORTS = {
  relevance: () => 0, // stable sort keeps the original order
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || a.price - b.price, // tie-break on price
  name: (a, b) => a.name.localeCompare(b.name),
};
```

### 4. Reset the page when filters change

If you're on page 3 and a new search has one page of results, page 3 doesn't exist. Every filter change goes back to page 1:

```js
const update = (state, patch) => ({ ...state, ...patch, page: "page" in patch ? patch.page : 1 });
```

### 5. Facet counts

Show how many products each category checkbox would give, e.g. "Phones (3)". Count on the list **before** the category filter is applied, otherwise unchecked categories would always show 0:

```js
const categoryCounts = facetBase.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {});
```

### 6. Empty state

`total === 0` → show "No products match" and a **Clear filters** button that sets `state = initialState`.

## Array methods used

| Step | Methods |
|---|---|
| Index search text | `map`, spread |
| Search | `split`, `filter(Boolean)`, `every`, `includes` |
| Filters | `filter`, `includes`, `some` |
| Toggle checkbox | `includes`, `filter`, spread |
| Sort | `toSorted`, `localeCompare` |
| Paginate | `slice`, `Math.ceil` |
| Facets | `reduce` |
| Build checkbox lists | `new Set` + `map` + `toSorted` |

## Extensions

1. Add a brand facet with counts.
2. Add a minimum-rating filter (4.5★ and up).
3. Sync `state` to the URL (`URLSearchParams`) so a reload or shared link keeps the filters.
4. Debounce the search input (see Search Functionality).
5. Highlight the matched words in product names.
