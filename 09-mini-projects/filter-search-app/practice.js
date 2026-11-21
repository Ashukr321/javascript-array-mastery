// Mini project: Filter & Search App
// One pure function turns (products, state) into what the UI should show.
// Pipeline: search → filter → sort → paginate.
// Run: node practice.js

const products = [
  { id: 1, name: "MacBook Air", brand: "Apple", category: "Laptops", price: 999, rating: 4.7, inStock: true },
  { id: 2, name: "ThinkPad X1", brand: "Lenovo", category: "Laptops", price: 1299, rating: 4.5, inStock: false },
  { id: 3, name: "iPhone 15", brand: "Apple", category: "Phones", price: 799, rating: 4.6, inStock: true },
  { id: 4, name: "Pixel 8", brand: "Google", category: "Phones", price: 699, rating: 4.4, inStock: true },
  { id: 5, name: "Galaxy S24", brand: "Samsung", category: "Phones", price: 899, rating: 4.5, inStock: true },
  { id: 6, name: "AirPods Pro", brand: "Apple", category: "Audio", price: 249, rating: 4.6, inStock: true },
  { id: 7, name: "WH-1000XM5", brand: "Sony", category: "Audio", price: 399, rating: 4.8, inStock: false },
  { id: 8, name: "Galaxy Buds", brand: "Samsung", category: "Audio", price: 149, rating: 4.1, inStock: true },
  { id: 9, name: "iPad Air", brand: "Apple", category: "Tablets", price: 599, rating: 4.7, inStock: true },
  { id: 10, name: "Galaxy Tab S9", brand: "Samsung", category: "Tablets", price: 799, rating: 4.3, inStock: true },
];

const fold = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Pre-compute the searchable text once
const indexed = products.map((p) => ({ ...p, _search: fold(`${p.name} ${p.brand} ${p.category}`) }));

const SORTS = {
  relevance: () => 0, // stable sort keeps original order
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating || a.price - b.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

const initialState = {
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

function getView(list, state) {
  const words = fold(state.query).split(/\s+/).filter(Boolean);
  const filtered = list.filter(
    (p) =>
      words.every((w) => p._search.includes(w)) &&
      (state.categories.length === 0 || state.categories.includes(p.category)) &&
      (state.brands.length === 0 || state.brands.includes(p.brand)) &&
      (state.minPrice == null || p.price >= state.minPrice) &&
      (state.maxPrice == null || p.price <= state.maxPrice) &&
      (!state.inStockOnly || p.inStock),
  );
  const sorted = filtered.toSorted(SORTS[state.sort]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / state.pageSize));
  const page = Math.min(Math.max(1, state.page), totalPages);
  const start = (page - 1) * state.pageSize;

  // Facet counts: how many results each category would have (ignoring the category filter itself)
  const facetBase = list.filter((p) => words.every((w) => p._search.includes(w)) && (!state.inStockOnly || p.inStock));
  const categoryCounts = facetBase.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {});

  return {
    items: sorted.slice(start, start + state.pageSize),
    total: sorted.length,
    page,
    totalPages,
    categoryCounts,
    priceRange: sorted.length ? [Math.min(...sorted.map((p) => p.price)), Math.max(...sorted.map((p) => p.price))] : null,
  };
}

// Any filter change resets to page 1
const update = (state, patch) => ({ ...state, ...patch, page: "page" in patch ? patch.page : 1 });
const toggle = (arr, value) => (arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

// --- Demo: simulate a user session ---
const show = (label, state) => {
  const v = getView(indexed, state);
  console.log(`\n# ${label}  (${v.total} results, page ${v.page}/${v.totalPages})`);
  v.items.forEach((p) => console.log(`  ${p.name.padEnd(14)} ${p.brand.padEnd(8)} $${String(p.price).padStart(4)}  ★${p.rating}${p.inStock ? "" : "  (out of stock)"}`));
  console.log("  categories:", v.categoryCounts, "price range:", v.priceRange);
};

let state = initialState;
show("Everything", state);

state = update(state, { page: 2 });
show("Page 2", state);

state = update(state, { query: "galaxy" });
show('Search "galaxy" (page reset to 1)', state);

state = update(state, { query: "apple", categories: toggle(state.categories, "Phones") });
state = update(state, { categories: toggle(state.categories, "Audio") });
show('"apple" in Phones + Audio', state);

state = update(initialState, { inStockOnly: true, maxPrice: 800, sort: "rating" });
show("In stock, ≤ $800, best rated", state);

state = update(state, { query: "nokia" });
show("No results", state);

// --- Extensions ---
// a) Add a "brand" facet with counts, like categoryCounts.
// b) Add a minRating filter (e.g. 4.5+).
// c) Serialise state to a URL query string and back, so filters survive a reload.
