// Practice: findIndex

// Add your practice code here

const users = [
    { id: 1, name: "Alice" }, // 0 
    { id: 2, name: "Bob" }, // 1
    { id: 3, name: "Charlie" } // 2 
];
//  indexing started from 0 to n-1;

// array of object we created

const index = users.findIndex(user => user.id === 3);
console.log(index); // 1


// array of cart items 
const cart = [
    { id: 1, item: "Apple" },
    { id: 2, item: "Banana" },
];

// here we get the product id index 
const idx = cart.findIndex(p => p.id === 2);

// splice methods is use to remove the that product from cart 
if (idx !== -1) {
    cart.splice(idx, 1);
    // idx : target index , 1 : number  of  element we want to remove from an array 
}

console.log(cart);// splice methods is the mutating methods that will change the original array 



// ---- More practice ----
{
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];
  console.log(users.findIndex((u) => u.id === 3)); // 2 (not 1: Charlie is the third item)
  console.log(users.findIndex((u) => u.id === 9)); // -1

  // gotcha: -1 is truthy, 0 is falsy
  const idx = users.findIndex((u) => u.name === "Alice"); // 0
  console.log(Boolean(idx), idx !== -1); // false true

  // findIndex vs indexOf
  console.log([NaN].indexOf(NaN), [NaN].findIndex(Number.isNaN)); // -1 0

  // real-world: toggle a todo in state without mutating
  const toggleTodo = (todos, id) => {
    const i = todos.findIndex((t) => t.id === id);
    if (i === -1) return todos;
    return todos.with(i, { ...todos[i], done: !todos[i].done });
  };
  const todos = [{ id: 1, done: false }, { id: 2, done: false }];
  console.log(toggleTodo(todos, 2)); // [{ id: 1, done: false }, { id: 2, done: true }]
  console.log(todos[1].done); // false (original unchanged)

  // real-world: add to cart or increase quantity
  const addToCart = (cart, product) => {
    const i = cart.findIndex((item) => item.id === product.id);
    if (i === -1) return [...cart, { ...product, qty: 1 }];
    return cart.map((item, n) => (n === i ? { ...item, qty: item.qty + 1 } : item));
  };
  let cart = addToCart([], { id: 7, name: "Mug" });
  cart = addToCart(cart, { id: 7, name: "Mug" });
  console.log(cart); // [{ id: 7, name: 'Mug', qty: 2 }]

  // real-world: keyboard navigation (next option, wraps around)
  const options = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const current = options.findIndex((o) => o.id === "c");
  console.log(options[(current + 1) % options.length]); // { id: 'a' }

  // remove without mutating
  const i = users.findIndex((u) => u.id === 2);
  console.log(users.toSpliced(i, 1).map((u) => u.name)); // ['Alice', 'Charlie']

  // polyfill
  Array.prototype.myFindIndex = function (cb, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (cb.call(thisArg, this[i], i, this)) return i;
    }
    return -1;
  };
  console.log([4, 8, 15].myFindIndex((n) => n > 5)); // 1
}

// --- Exercises ---
// 1. Write updateUser(users, id, changes) that returns a new array with that user merged with changes.
// 2. Find the index of the first negative number in [3, 7, -2, 5, -9]; then of the last one (findLastIndex).
// 3. Write moveUp(list, id) that swaps an item with the one before it (no mutation, no-op at index 0 or -1).
