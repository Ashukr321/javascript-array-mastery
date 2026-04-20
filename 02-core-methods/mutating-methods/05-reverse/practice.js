// Practice: reverse

// Add your practice code here
let num = [1,2,4];
const newArr = [...num].reverse(); // reverse without mutating original array here we do shallow copy 

console.log(newArr);

console.log(num===newArr)// true bec both are same 