// Practice: map()

const numbers = [1, 2, 3, 4, 5];

// 1. Create a new array that contains the squares of each number.
// 2. Log the squares array.
// 3. Create a new array of strings that says "Number is: X" for each number.
// 4. Log the strings array and the original numbers array.

const squares = numbers.map(n => n * n);
console.log(squares); // [1, 4, 9, 16, 25]

const strings = numbers.map(n => `Number is: ${n}`);
console.log(strings); // ["Number is: 1", "Number is: 2", ...]
console.log(numbers); // [1, 2, 3, 4, 5] (original is unchanged)

// ---- More practice ----
{
  // array of objects: pick a field / return new objects
  const people = [
    { id: 1, first: "Ashutosh", last: "Kumar" },
    { id: 2, first: "Amit", last: "Singh" },
  ];
  console.log(people.map((u) => u.first)); // ['Ashutosh', 'Amit']
  console.log(people.map((u) => ({ id: u.id, fullName: `${u.first} ${u.last}` })));

  // using index
  console.log(["a", "b", "c"].map((l, i) => `${i + 1}. ${l}`)); // ['1. a', '2. b', '3. c']

  // real-world: render a list (React-style, as strings so it runs in Node)
  const products = [
    { id: 101, name: "Pen", price: 20 },
    { id: 102, name: "Notebook", price: 60 },
  ];
  const listItems = products.map((p) => `<li key="${p.id}">${p.name}: ${p.price}</li>`);
  console.log(`<ul>${listItems.join("")}</ul>`);

  // real-world: reshape an API response
  const apiUsers = [
    { user_id: 7, full_name: "Alice", is_active: 1 },
    { user_id: 8, full_name: "Bob", is_active: 0 },
  ];
  console.log(apiUsers.map((u) => ({ id: u.user_id, name: u.full_name, active: Boolean(u.is_active) })));

  // real-world: update one item immutably
  const todos = [{ id: 1, done: false }, { id: 2, done: false }];
  console.log(todos.map((t) => (t.id === 2 ? { ...t, done: true } : t)));
  console.log(todos[1].done); // false (original unchanged)

  // gotchas
  console.log([1, 2].map((n) => { n * 2; })); // [undefined, undefined] (no return)
  console.log(["1", "2", "3"].map(parseInt)); // [1, NaN, NaN]
  console.log(["1", "2", "3"].map(Number)); // [1, 2, 3]

  // polyfill
  Array.prototype.myMap = function (cb, thisArg) {
    if (typeof cb !== "function") throw new TypeError(cb + " is not a function");
    const result = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
      if (i in this) result[i] = cb.call(thisArg, this[i], i, this);
    }
    return result;
  };
  console.log([1, 2, 3].myMap((n) => n * 10)); // [10, 20, 30]
}

// --- Exercises ---
// 1. Convert prices in rupees [100, 250, 999] to strings like "Rs 100.00".
// 2. Given users [{ name, birthYear }], return [{ name, age }] for the current year.
// 3. Write capitalizeAll(words) that turns ["hello", "world"] into ["Hello", "World"].
