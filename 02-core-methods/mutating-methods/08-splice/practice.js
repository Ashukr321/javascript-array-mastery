// Practice: splice

// Add your practice code here

let number = [1, 2, 4];
number.splice(0, 1, 5); // 
// 1 : delete number of element : 1 is delete and 5 is inserted
// add element in the start of the array 

console.log(number);

console.log("--------------------------")

// remove item from array 

const data = [1, 2, 4, 4, 4, 4];
data.splice(1, 3); // 1 index se 3  element will be removed 
console.log(data);

// 
console.log("----------------------------")

data.splice(0, 0, 1, 2, 6); // mutate the original array
console.log(data);

// // splice methods is also use of the replacing the array element 
let arr = [10, 20, 30, 40];

// Replace 20 with 99
arr.splice(1, 1, 99);
// startIndex is : 1, 
// 1 : delete Number of element : 
// 99 is the add element at index of 1 : 


console.log(arr); // [10, 99, 30, 40]

// here we see splice(startIndex, number of element deleteCount , add item );




// fill(value, startIndex,endIndex);
// splice(startIndex, deleteNumberOfElement, addElement);

// array of object : store data in cart
const cart = [
    { id: 1, name: "Shoes" },
    { id: 2, name: "T-shirt" },
    { id: 3, name: "Watch" }
];

const index = cart.findIndex(item => item.id === 2);
// get the index of the card item 
// use of the findIndex methods 
// findIndex use for find the index of the product 

// splice methods(startIndex, numberOfItemDelete);

// startIndex is not -1: edge case 


if (index !== -1) {
    cart.splice(index, 1); // remove T-shirt // remove that item from cart 

}

console.log(cart);

const users = [
    { id: 1, name: "Ashu" },
    { id: 2, name: "Rahul" }
];

const index = users.findIndex(u => u.id === 2);

// here we use to update the item 
users.splice(index, 1, { id: 2, name: "Rahul Kumar" });

console.log(users);

// create the array of task we need to insert into cart 
let tasks = ["Task1", "Task2", "Task3"];

// Add high priority task at top
tasks.splice(0, 0, "Urgent Task");

console.log(tasks);
// findIndex methods find the first match and return the index of the first match element 
