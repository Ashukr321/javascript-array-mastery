// Practice: reduce

const numArr = [1,2,3,4,5];

const resultSum = numArr.reduce((acc,curr)=>{
    return acc = acc+curr;
},0);

// default this return undefined so we need to  must return the accumulator;

console.log(resultSum);


const arr = [[1, 2], [3, 4], [5,[6]]];

const flat = arr.reduce((acc,curr)=>{
   return acc.concat(Array.isArray(curr) ? flatMap(curr) : curr);
},[])// our accumulator intial will be : [] empty array in which we store 

console.log(flat);   
// flat array 
// nested or recursive flat array 

// ---- More practice ----
// Note: the flatMap(curr) call above throws "ReferenceError: flatMap is not defined", so this block
// only runs once that line is fixed (for example by using the flatten function below).
{
  // step by step
  [1, 2, 3].reduce((acc, curr) => {
    console.log(acc, curr);
    return acc + curr;
  }, 0);

  // max
  console.log([4, 9, 2].reduce((max, n) => (n > max ? n : max), -Infinity)); // 9

  // deep flatten: the function calls itself by name
  const flatten = (list) =>
    list.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr), []);
  console.log(flatten([[1, 2], [3, 4], [5, [6]]])); // [1, 2, 3, 4, 5, 6]

  // real-world: cart total
  const cart = [
    { name: "Shoes", price: 2000, qty: 1 },
    { name: "Socks", price: 150, qty: 3 },
  ];
  console.log(cart.reduce((sum, item) => sum + item.price * item.qty, 0)); // 2450

  // real-world: counting
  const orders = [{ status: "paid" }, { status: "pending" }, { status: "paid" }];
  console.log(orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {})); // { paid: 2, pending: 1 }

  // real-world: groupBy
  const products = [
    { name: "Laptop", category: "tech" },
    { name: "Shirt", category: "clothes" },
    { name: "Phone", category: "tech" },
  ];
  const byCategory = products.reduce((acc, p) => {
    (acc[p.category] ||= []).push(p.name);
    return acc;
  }, {});
  console.log(byCategory); // { tech: ['Laptop', 'Phone'], clothes: ['Shirt'] }

  // real-world: lookup object by id
  const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
  const usersById = users.reduce((acc, u) => {
    acc[u.id] = u;
    return acc;
  }, {});
  console.log(usersById[2].name); // Bob

  // gotchas
  try {
    [].reduce((a, b) => a + b);
  } catch (e) {
    console.log(e.message); // Reduce of empty array with no initial value
  }
  console.log(cart.reduce((s, i) => s + i.price)); // "[object Object]150" (no initial value)

  // pipe
  const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);
  console.log(pipe((n) => n + 1, (n) => n * 2)(5)); // 12

  // polyfill
  Array.prototype.myReduce = function (cb, ...rest) {
    let i = 0;
    let acc;
    if (rest.length > 0) {
      acc = rest[0];
    } else {
      while (i < this.length && !(i in this)) i++;
      if (i >= this.length) throw new TypeError("Reduce of empty array with no initial value");
      acc = this[i++];
    }
    for (; i < this.length; i++) {
      if (i in this) acc = cb(acc, this[i], i, this);
    }
    return acc;
  };
  console.log([1, 2, 3, 4].myReduce((a, b) => a * b)); // 24
}

// --- Exercises ---
// 1. Given ["a", "b", "a", "c", "b", "a"], return the most frequent letter.
// 2. Turn [["name", "Ashu"], ["age", 21]] into { name: "Ashu", age: 21 } using reduce (then compare with Object.fromEntries).
// 3. Given transactions [{ type: "credit" | "debit", amount }], compute the final balance.
