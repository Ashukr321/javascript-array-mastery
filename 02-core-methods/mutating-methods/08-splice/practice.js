// Practice: splice

// Add your practice code here

let number = [1, 2, 4];
number.splice(0, 1, 5);
// add element in the start of the array 

console.log(number);


// remove item from array 

const data = [1, 2, 4, 4, 4, 4];
data.splice(1, 3); // 1 index se 3  element will be removed 
console.log(data);

data.splice(0, 0, 1, 2, 6); // mutate the original array
console.log(data);
// // splice methods is also use of the replacing the array element 
let arr = [10, 20, 30, 40];

// Replace 20 with 99
arr.splice(1, 1, 99);

console.log(arr); // [10, 99, 30, 40]

// here we see splice(startIndex, number of element deleteCount , add item );


