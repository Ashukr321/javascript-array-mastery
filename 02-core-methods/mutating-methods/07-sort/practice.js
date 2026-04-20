// sort methods 


let arr = [3, 1, 4, 1, 5];

// internal working we need to understand how it work 
const sortedArr = [...arr].sort((a, b) => a - b); // without mutating the original array we sort the element of the array 


console.log(sortedArr);  