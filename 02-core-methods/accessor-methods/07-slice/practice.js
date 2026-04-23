// Practice: slice

const str = "Ashutosh";
console.log(str.slice(0,3));// o t0 end index this will return all the string 


// apply on array 
const arr = [3,4,4,5,6,3];
console.log(arr.slice(0)); // we pass the start and index index 

// edge case :if we pass the endIndex : index out of bounds then 
console.log(arr.slice(0,10)); // it will return all the elements within the bounds

// if we pass the endIndex index out of bounds in that case also return all the element of the array 
// this methods is not return new array this will create the new array and then return the new array 
// this is the non mutating methods in js 
// -ve index will return the reverse order item of the array 
console.log(arr.slice(-3,-1)); 
// it will return the elements from the end of the array 
