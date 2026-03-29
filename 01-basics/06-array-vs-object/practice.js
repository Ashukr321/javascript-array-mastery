// Practice: Array vs. Object

const arr = [10, 20, 30];
const obj = { 0: 10, 1: 20, 2: 30 };

// 1. Check if both are arrays using Array.isArray().
// 2. Check the type of both using typeof.
// 3. Log the length of both.
// 4. Update the element at index 0 of both.

console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false

console.log(typeof arr); // object
console.log(typeof obj); // object

console.log(arr.length); // 3
console.log(obj.length); // undefined (objects don't have a length property)

arr[0] = 100;
obj[0] = 100;
console.log(arr); // [100, 20, 30]
console.log(obj); // {0: 100, 1: 20, 2: 30}
