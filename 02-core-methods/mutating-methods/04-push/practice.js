// Practice: push()

// add new element at the  end of the array item and it mutate the original array 

const stack = [];

// 1. Push numbers 1, 2, 3 into the stack.
// 2. Log the stack.
// 3. Push 'hello' and 'world' at once.
// 4. Log the new length and the stack.

stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); // [1, 2, 3]

const newLength = stack.push('hello', 'world');
console.log(newLength); // 5
console.log(stack); // [1, 2, 3, 'hello', 'world']
let newArr = stack.push("Ashutosh");
console.log(newArr);

// ---- More practice ----
{
  // push returns the NEW LENGTH, not the array
  const animals = ["pigs", "goats", "sheep"];
  const count = animals.push("cows");
  console.log(count, animals); // 4 ["pigs", "goats", "sheep", "cows"]

  // push an array vs spread it
  const a = [1, 2];
  a.push([3, 4]);
  a.push(...[5, 6]);
  console.log(a); // [1, 2, [3, 4], 5, 6]

  // collect results in a loop
  const orders = [
    { id: 1, total: 499 },
    { id: 2, total: 1299 },
    { id: 3, total: 2499 },
  ];
  const bigOrderIds = [];
  for (const order of orders) {
    if (order.total > 1000) bigOrderIds.push(order.id);
  }
  console.log(bigOrderIds); // [2, 3]

  // app log
  const logs = [];
  const log = (level, message) => logs.push({ level, message });
  log("info", "User logged in");
  log("error", "Payment failed");
  console.log(logs.length, logs[1].message); // 2 "Payment failed"

  // job queue: push to enqueue, shift to dequeue (FIFO)
  const queue = [];
  queue.push("send-email", "resize-image");
  console.log(queue.shift(), queue); // "send-email" ["resize-image"]

  // cart in React style: new array instead of push
  let cart = [{ id: 1, name: "Shoes" }];
  const before = cart;
  cart = [...cart, { id: 2, name: "Watch" }];
  console.log(cart.length, before.length, cart === before); // 2 1 false

  // same reference: push is visible through both names
  const data = [1];
  const alias = data;
  alias.push(2);
  console.log(data); // [1, 2]
}

// --- Exercises ---
// 1. Implement a Stack with push, pop and peek using an array.
// 2. Write myPush(arr, ...items) that adds items with arr[arr.length] = item and returns the new length.
// 3. Given [[1, 2], [3], [4, 5]], build a flat array using only a loop and push.
