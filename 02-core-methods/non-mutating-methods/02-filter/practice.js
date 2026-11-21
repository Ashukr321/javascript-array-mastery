// Practice: filter
// it create the new array it is a hof : in callback function 
// each item of the array goes and check condition if the condition is true then added into newly created  array 
// and return it 

// it does't mutate the original array 



// filter((currentElement,index, array)=>{});

// index is refer to the current index  of the element 
// array on which we apply the filter methods 
// we can also apply on array of object 

const users = [
    {name :"ASHUTOSH",age:21},
    {
        name:"amit",age:17,
    },
    {
        name:"sumit",age:25
    }
]

const adult  = users.filter((user)=>user.age>=18);

console.log(adult);
// widely use in the react application for the filtering the data;


// ---- More practice ----

const nums = [1, 2, 3, 4, 5, 6];
console.log(nums.filter((n) => n % 2 === 0)); // [2, 4, 6]
console.log(nums); // unchanged

// using index
console.log(nums.filter((_, i) => i % 2 === 0)); // [1, 3, 5]

// dedupe with index + array
const tags = ["js", "css", "js"];
console.log(tags.filter((tag, i, arr) => arr.indexOf(tag) === i)); // ['js', 'css']

// remove falsy values
console.log([0, "hi", "", null, 42, undefined, NaN].filter(Boolean)); // ['hi', 42]

// chaining
console.log(users.filter((u) => u.age >= 18).map((u) => u.name)); // ['ASHUTOSH', 'sumit']

// gotcha: forgot to return
console.log(nums.filter((n) => { n > 2; })); // []

// gotcha: shallow copy
const copy = users.filter(() => true);
console.log(copy[0] === users[0]); // true

// React-style delete from state
const todos = [{ id: 1, text: "a" }, { id: 2, text: "b" }];
console.log(todos.filter((t) => t.id !== 1)); // [{ id: 2, text: 'b' }]

// polyfill
Array.prototype.myFilter = function (cb, thisArg) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && cb.call(thisArg, this[i], i, this)) result.push(this[i]);
  }
  return result;
};
console.log(nums.myFilter((n) => n > 3)); // [4, 5, 6]

// --- Exercises ---
// 1. From users, get everyone whose name is all uppercase.
// 2. Given products [{ name, price, inStock }], return in-stock products under 500.
// 3. Write searchByName(users, query) that is case-insensitive and ignores extra spaces.
