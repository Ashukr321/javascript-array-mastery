// Practice: find

const nums = [5, 12, 8, 130, 44];
console.log(nums.find((n) => n > 10)); // 12 (first match only)
console.log(nums.find((n) => n > 500)); // undefined

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// find returns a single element, filter returns an array
console.log(users.find((u) => u.id > 1)); // { id: 2, name: 'Bob' }
console.log(users.filter((u) => u.id > 1)); // [{ id: 2 ... }, { id: 3 ... }]

// ---- More practice ----
{
  // handling "not found"
  const missing = users.find((u) => u.id === 99);
  console.log(missing?.name ?? "Guest"); // Guest

  // real-world: find a user by id from an API response (id from the URL is a string)
  const userIdFromUrl = "3";
  const user = users.find((u) => u.id === Number(userIdFromUrl));
  console.log(user ? user.name : "User not found"); // Charlie

  // real-world: selected option from an id stored in state
  const plans = [
    { id: "free", label: "Free", price: 0 },
    { id: "pro", label: "Pro", price: 499 },
  ];
  console.log(plans.find((p) => p.id === "pro")); // { id: 'pro', label: 'Pro', price: 499 }

  // real-world: feature flag lookup
  const flags = [
    { key: "darkMode", enabled: true },
    { key: "betaCheckout", enabled: false },
  ];
  console.log(flags.find((f) => f.key === "darkMode")?.enabled ?? false); // true

  // gotcha: returns a reference, not a copy
  const bob = users.find((u) => u.name === "Bob");
  console.log(bob === users[1]); // true

  // gotcha: find visits holes
  console.log([1, , 3].findIndex((x) => x === undefined)); // 1 (the hole was visited)

  // findLast
  console.log(nums.findLast((n) => n > 10)); // 44

  // polyfill
  Array.prototype.myFind = function (cb, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) return this[i];
    }
    return undefined;
  };
  console.log(users.myFind((u) => u.name.startsWith("C"))); // { id: 3, name: 'Charlie' }
}

// --- Exercises ---
// 1. From products [{ name, price }], find the first product cheaper than 100.
// 2. Write getUserByEmail(users, email) that ignores case and returns null when not found.
// 3. Given posts [{ id, comments: [{ id, text }] }], find the comment with a given id across all posts.
