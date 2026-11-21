// // Practice: splice

// // Add your practice code here

// let number = [1, 2, 4];
// number.splice(0, 1, 5); // 
// // 1 : delete number of element : 1 is delete and 5 is inserted
// // add element in the start of the array 

// console.log(number);

// console.log("--------------------------")

// // remove item from array 

// const data = [1, 2, 4, 4, 4, 4];
// data.splice(1, 3); // 1 index se 3  element will be removed 
// console.log(data);

// // 
// console.log("----------------------------")

// data.splice(0, 0, 1, 2, 6); // mutate the original array
// console.log(data);

// // // splice methods is also use of the replacing the array element 
// let arr = [10, 20, 30, 40];

// // Replace 20 with 99
// arr.splice(1, 1, 99);
// // startIndex is : 1, 
// // 1 : delete Number of element : 
// // 99 is the add element at index of 1 : 


// console.log(arr); // [10, 99, 30, 40]

// // here we see splice(startIndex, number of element deleteCount , add item );



// // fill(value, startIndex,endIndex);
// // splice(startIndex, deleteNumberOfElement, addElement);

// // array of object : store data in cart
// const cart = [
//     { id: 1, name: "Shoes" },
//     { id: 2, name: "T-shirt" },
//     { id: 3, name: "Watch" }
// ];

// const index = cart.findIndex(item => item.id === 2);
// // get the index of the card item 
// // use of the findIndex methods 
// // findIndex use for find the index of the product 

// // splice methods(startIndex, numberOfItemDelete);

// // startIndex is not -1: edge case 


// if (index !== -1) {
//     cart.splice(index, 1); // remove T-shirt // remove that item from cart 

// }

// console.log(cart);

// const users = [
//     { id: 1, name: "Ashu" },
//     { id: 2, name: "Rahul" }
// ];

// const index = users.findIndex(u => u.id === 2);

// // here we use to update the item 
// users.splice(index, 1, { id: 2, name: "Rahul Kumar" });

// console.log(users);

// // create the array of task we need to insert into cart 
// let tasks = ["Task1", "Task2", "Task3"];

// // Add high priority task at top
// tasks.splice(0, 0, "Urgent Task");

// console.log(tasks);
// // findIndex methods find the first match and return the index of the first match element 


// console.log(arr.indexOf(3)); // Output: 2


// splice methods 
let arr = [5, 4, 3, 3, 2];

// splice(startIndex, countDelete, add_value)

console.log(arr);
arr.splice(0, arr.length);
// arr = [];
console.log(arr);

// ---- More practice ----
{
  // splice returns the REMOVED elements
  const letters = ["a", "b", "c", "d"];
  const removed = letters.splice(1, 2);
  console.log(removed, letters); // ["b", "c"] ["a", "d"]

  // insert without removing (deleteCount = 0)
  letters.splice(1, 0, "x", "y");
  console.log(letters); // ["a", "x", "y", "d"]

  // no deleteCount: remove everything from start to end
  const tail = [1, 2, 3, 4, 5];
  tail.splice(2);
  console.log(tail); // [1, 2]

  // negative start counts from the end
  const n = [1, 2, 3, 4];
  n.splice(-1, 1);
  console.log(n); // [1, 2, 3]

  // trap: findIndex returns -1, splice(-1, 1) removes the LAST item
  const cart = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const i = cart.findIndex((item) => item.id === 99);
  if (i !== -1) cart.splice(i, 1); // guard keeps the cart safe
  console.log(cart.length); // 3

  // non-mutating version (ES2023)
  const base = [10, 20, 30];
  console.log(base.toSpliced(1, 1, 99), base); // [10, 99, 30] [10, 20, 30]

  // removing inside a loop: go backwards so indexes do not shift under you
  const values = [1, 2, 2, 3, 2];
  for (let k = values.length - 1; k >= 0; k--) {
    if (values[k] === 2) values.splice(k, 1);
  }
  console.log(values); // [1, 3]
}

// --- Exercises ---
// 1. Write removeById(list, id) that removes the matching object in place and returns the removed item (or null).
// 2. Move the item at index 3 to index 0 using two splice calls.
// 3. Write insertAt(arr, index, item) that returns a NEW array (use toSpliced or slice, not splice).
