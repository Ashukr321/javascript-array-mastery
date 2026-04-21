// Practice: toSpliced

const fruits = ["apple", "banana", "cherry"]; // array literals

const result = fruits.toSpliced(1, 1, "mango"); // target index is 1 , add remove  1 , and add mango

console.log(result); // ["apple", "mango", "cherry"] ; as expected output 
console.log(fruits); // ["apple", "banana", "cherry"] ✅ unchanged

