// Practice: search functionality
// Run: node practice.js

const contacts = [
  { name: "Asha Verma", email: "asha@mail.com", city: "Pune" },
  { name: "Ravi Kumar", email: "ravi@work.io", city: "Delhi" },
  { name: "Élodie Martin", email: "elodie@mail.fr", city: "Paris" },
  { name: "Ravindra Rao", email: "rr@mail.com", city: "Pune" },
];
const fields = ["name", "email", "city"];
const fold = (s) => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// 1. Every word must appear in some field
function searchWords(list, query) {
  const words = fold(query).split(/\s+/).filter(Boolean);
  return list.filter((item) => {
    const hay = fold(fields.map((f) => item[f]).join(" "));
    return words.every((w) => hay.includes(w));
  });
}
console.log(searchWords(contacts, "mail pune").map((c) => c.name));
console.log(searchWords(contacts, "elodie").map((c) => c.name));
console.log(searchWords(contacts, "").length, "results for empty query");

// 2. Ranked: exact > startsWith > includes
const score = (text, q) => (text === q ? 3 : text.startsWith(q) ? 2 : text.includes(q) ? 1 : 0);
function ranked(list, query) {
  const q = fold(query.trim());
  return list
    .map((item) => ({ item, s: score(fold(item.name), q) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.item.name.localeCompare(b.item.name))
    .map((r) => r.item.name);
}
console.log("ranked 'ra':", ranked(contacts, "ra"));

// 3. Highlight
const highlight = (text, q) => {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  return i === -1 ? text : `${text.slice(0, i)}[${text.slice(i, i + q.length)}]${text.slice(i + q.length)}`;
};
console.log(highlight("Ravi Kumar", "kum"));

// --- Exercises ---
// a) Pre-compute a `_search` string for each contact and search against it.
// b) Write a debounce(fn, ms) and simulate typing "r", "ra", "rav" quickly; only the last search should run.
// c) Return at most 3 results, best-ranked first.
