// Practice: unshift

// Add your practice code here


let num = [1,2,4];
num.unshift(-12);
console.log(num);



// ---- More practice ----
{
  // unshift returns the NEW LENGTH, not the array
  const nums = [3, 4];
  const len = nums.unshift(1, 2);
  console.log(len, nums); // 4 [1, 2, 3, 4]

  // one call keeps order, separate calls flip it
  const a = [];
  a.unshift(1);
  a.unshift(2);
  console.log(a); // [2, 1]

  // passing an array nests it; spread it instead
  const items = [1, 2];
  const nested = [3];
  nested.unshift(items);
  console.log(nested); // [[1, 2], 3]
  const fixed = [3];
  fixed.unshift(...items);
  console.log(fixed); // [1, 2, 3]

  // immutable unshift (React state style)
  const notifications = [{ id: 1, msg: "old" }];
  const updated = [{ id: 2, msg: "new" }, ...notifications];
  console.log(updated.map((n) => n.msg), notifications.length); // ["new", "old"] 1

  // recently viewed: newest first, no duplicates, max 3
  const addRecent = (list, item) => [item, ...list.filter((x) => x !== item)].slice(0, 3);
  let recent = ["b", "c", "d"];
  recent = addRecent(recent, "c");
  console.log(recent); // ["c", "b", "d"]
}

// --- Exercises ---
// 1. Write rotateRight(arr) that moves the last element to the front using pop and unshift.
// 2. Build a "latest 5 messages" list: unshift each new message and drop extras with length or slice.
// 3. Write prepend(arr, ...items) that returns a NEW array (no mutation).
