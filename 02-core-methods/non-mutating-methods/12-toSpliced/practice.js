// Practice: toSpliced

const fruits = ["apple", "banana", "cherry"]; // array literals

const result = fruits.toSpliced(1, 1, "mango"); // target index is 1 , add remove  1 , and add mango

console.log(result); // ["apple", "mango", "cherry"] ; as expected output 
console.log(fruits); // ["apple", "banana", "cherry"] ✅ unchanged


// ---- More practice ----
{
  const nums = [10, 20, 30, 40];
  console.log(nums.toSpliced(1, 2)); // [10, 40]  remove
  console.log(nums.toSpliced(1, 0, 15)); // [10, 15, 20, 30, 40]  insert
  console.log(nums.toSpliced(-1)); // [10, 20, 30]  remove last
  console.log(nums); // [10, 20, 30, 40]  (unchanged)

  // compare with splice
  const copy = [...nums];
  console.log(copy.splice(1, 1)); // [20]  (splice returns the REMOVED items)

  // remove a todo by index (React style)
  let todos = ["Buy milk", "Pay bills", "Call mom"];
  todos = todos.toSpliced(1, 1);
  console.log(todos); // ["Buy milk", "Call mom"]

  // insert a row below row 1
  const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
  console.log(rows.toSpliced(1, 0, { id: 99 }).map((r) => r.id)); // [1, 99, 2, 3]

  // drag and drop reorder
  const move = (list, from, to) => list.toSpliced(from, 1).toSpliced(to, 0, list[from]);
  console.log(move(["a", "b", "c", "d"], 0, 2)); // ["b", "c", "a", "d"]

  // guard findIndex -1 (otherwise the last item is removed)
  const cart = [{ id: 1 }, { id: 2 }];
  const i = cart.findIndex((item) => item.id === 42);
  console.log(i === -1 ? cart : cart.toSpliced(i, 1)); // cart unchanged
}

// --- Exercises ---
// 1. Remove the item with a given id from a cart using findIndex + toSpliced (guard -1).
// 2. Insert "Urgent" at index 0 and "Later" at the end of a task list in one expression.
// 3. Write myToSpliced(arr, start, deleteCount, ...items) using slice and spread.
