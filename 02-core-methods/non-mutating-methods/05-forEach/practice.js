let arr= [1,2,3];
// here we mutate original array 
arr.forEach((el,i)=>{
  arr[i] = (el*4)
})

console.log(arr);
// for each method does't return anything default it return undefined

// ---- More practice ----
{
  // basic loop with index
  ["apple", "banana", "mango"].forEach((fruit, i) => console.log(i, fruit));

  // returns undefined
  console.log([1, 2, 3].forEach((n) => n * 2)); // undefined

  // prefer map to build a new array
  console.log([1, 2, 3].map((el) => el * 4)); // [4, 8, 12]

  // return only skips the current element (no break)
  [1, 2, 3, 4].forEach((n) => {
    if (n === 2) return;
    console.log("forEach saw", n); // 1, 3, 4
  });
  // use for...of when you need break
  for (const n of [1, 2, 3, 4]) {
    if (n === 2) break;
    console.log("for...of saw", n); // 1
  }

  // holes are skipped
  [1, , 3].forEach((n) => console.log("hole test", n)); // 1, 3

  // real-world: analytics / logging side effects
  const impressions = [{ id: "p1" }, { id: "p2" }];
  impressions.forEach((p) => console.log("track impression", p.id));

  // real-world: DOM-like updates (fake tab objects so this runs in Node)
  const tabs = [{ classes: new Set(["tab", "active"]) }, { classes: new Set(["tab"]) }];
  tabs.forEach((tab) => tab.classes.delete("active"));
  console.log(tabs.map((t) => [...t.classes])); // [['tab'], ['tab']]

  // real-world: build a lookup object from API data
  const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
  const byId = {};
  users.forEach((u) => { byId[u.id] = u; });
  console.log(byId[2].name); // Bob

  // gotcha: forEach does not wait for async callbacks
  const log = [];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  [1, 2].forEach(async (n) => { await wait(1); log.push(n); });
  console.log("after forEach, log =", log); // [] (callbacks have not finished yet)

  // polyfill
  Array.prototype.myForEach = function (cb, thisArg) {
    const len = this.length;
    for (let i = 0; i < len; i++) {
      if (i in this) cb.call(thisArg, this[i], i, this);
    }
  };
  let total = 0;
  [10, 20, 30].myForEach((n) => { total += n; });
  console.log(total); // 60
}

// --- Exercises ---
// 1. Given an array of words, use forEach to count how many words start with a vowel.
// 2. Rewrite an async forEach that "saves" items so it really waits (for...of + await, then Promise.all).
// 3. Given [{ name, score }], print a numbered leaderboard line per player: "1. Alice - 90".
