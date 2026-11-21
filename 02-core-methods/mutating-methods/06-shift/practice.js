// Practice: shift
// shift is use to remove the first element of the array 
// Add your practice code here


let num = [1,2,3];
console.log(num.shift());




// ---- More practice ----
{
  // shift returns the removed first element
  const nums = [10, 20, 30];
  const first = nums.shift();
  console.log(first, nums); // 10 [20, 30]

  // empty array: undefined, no error
  console.log([].shift()); // undefined

  // queue: push + shift (first in, first out)
  const queue = [];
  queue.push("job1");
  queue.push("job2");
  queue.push("job3");
  while (queue.length) console.log("processing", queue.shift());

  // immutable shift (React state style)
  const toasts = ["saved", "deleted", "updated"];
  const remaining = toasts.slice(1);
  console.log(toasts, remaining); // ["saved", "deleted", "updated"] ["deleted", "updated"]

  // destructuring alternative
  const [head, ...rest] = toasts;
  console.log(head, rest); // "saved" ["deleted", "updated"]

  // O(n) shift avoided with a head index for large queues
  const jobs = ["a", "b", "c"];
  let h = 0;
  while (h < jobs.length) console.log("job", jobs[h++]);
}

// --- Exercises ---
// 1. Simulate a ticket counter: push 5 customers, then serve (shift) them one by one.
// 2. Write rotateLeft(arr) that moves the first element to the end using shift and push.
// 3. Write dropFirst(arr, n) that returns a new array without the first n items (no mutation).
