// Practice: pop

let num = [1,2,3,4];
console.log(num);// [1,2,3,4]
num.pop();
console.log(num);
// Add your practice code here



// ---- More practice ----
{
  // pop returns the removed element
  const nums = [10, 20, 30];
  const last = nums.pop();
  console.log(last, nums); // 30 [10, 20]

  // empty array: no error, just undefined
  console.log([].pop()); // undefined

  // stack: push + pop (last in, first out)
  const history = [];
  history.push("home");
  history.push("products");
  history.push("cart");
  console.log(history.pop()); // "cart"
  console.log(history);       // ["home", "products"]

  // peek without removing
  console.log(history.at(-1)); // "products"

  // immutable pop (React state style)
  const steps = ["a", "ab", "abc"];
  const undone = steps.slice(0, -1);
  console.log(steps, undone); // ["a", "ab", "abc"] ["a", "ab"]

  // pop everything until empty
  const stack = [1, 2, 3];
  while (stack.length) console.log("popped", stack.pop());
}

// --- Exercises ---
// 1. Use push/pop to check if a string of brackets like "([]{})" is balanced.
// 2. Write removeLast(arr) that returns a new array without the last item (no mutation).
// 3. Reverse an array by popping every element into a new array.
