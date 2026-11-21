# Search Functionality

A search box over a list (contacts, products, docs) is `filter` plus **text normalisation**. Getting the normalisation right is what makes search feel good.

## Simple case-insensitive search

```js
const contacts = [
  { name: "Asha Verma", email: "asha@mail.com", city: "Pune" },
  { name: "Ravi Kumar", email: "ravi@work.io", city: "Delhi" },
  { name: "Élodie Martin", email: "elodie@mail.fr", city: "Paris" },
];

const search = (list, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return list; // empty query shows everything
  return list.filter((c) => c.name.toLowerCase().includes(q));
};

search(contacts, "  RAVI "); // [Ravi Kumar]
```

## Search several fields

```js
const fields = ["name", "email", "city"];
const searchAll = (list, query) => {
  const q = query.trim().toLowerCase();
  return list.filter((item) => fields.some((f) => String(item[f]).toLowerCase().includes(q)));
};
```

## Every word must match

Users type `"mail pune"` meaning "both words, in any field, any order":

```js
const searchWords = (list, query) => {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return list.filter((item) => {
    const haystack = fields.map((f) => item[f]).join(" ").toLowerCase();
    return words.every((w) => haystack.includes(w));
  });
};

searchWords(contacts, "mail pune"); // [Asha Verma]
```

This is the same rule the search palette on this site uses.

## Ignore accents

`"elodie"` should find `"Élodie"`. Strip diacritics with `normalize`:

```js
const fold = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
contacts.filter((c) => fold(c.name).includes(fold("elodie"))); // [Élodie Martin]
```

## Rank results

Show better matches first: exact match > starts with > contains.

```js
const score = (text, q) => (text === q ? 3 : text.startsWith(q) ? 2 : text.includes(q) ? 1 : 0);

const ranked = (list, query) => {
  const q = fold(query.trim());
  return list
    .map((item) => ({ item, s: score(fold(item.name), q) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.item.name.localeCompare(b.item.name))
    .map((r) => r.item);
};
```

## Highlight the match

```js
const highlight = (text, q) => {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  return i === -1 ? text : `${text.slice(0, i)}<mark>${text.slice(i, i + q.length)}</mark>${text.slice(i + q.length)}`;
};
highlight("Ravi Kumar", "kum"); // "Ravi <mark>Kum</mark>ar"
```

(In a real UI, render the three parts as elements rather than building HTML strings, so user input can't inject markup.)

## Performance in real apps

- **Pre-compute** the searchable string once per item (`item._search = fold(name + " " + email)`), not on every keystroke.
- **Debounce** input (≈200–300 ms) so you don't filter on every key press.
- Beyond tens of thousands of items, move search to the server or use an index library.

```js
function debounce(fn, ms = 250) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
```

## Gotchas

- `"".includes("")` is `true`, so an empty query matches everything. Decide explicitly whether that's what you want.
- Don't put user input into `new RegExp(query)` unescaped: characters like `(` or `*` will throw or change the meaning.
- Numbers and `null` fields: wrap with `String(value ?? "")` before calling `toLowerCase`.
