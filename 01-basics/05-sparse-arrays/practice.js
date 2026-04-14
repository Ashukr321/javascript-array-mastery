// Practice: Sparse Arrays

const sparseArr = [1, , 3];
sparseArr.length=10;
console.log(sparseArr);
delete sparseArr[0];
console.log(sparseArr);

// 1. Log the length of the sparse array.
// 2. Check the value at index 1.
// 3. Set the length to 5 and log the array.
// 4. Delete the first element and log the array.


//array where some of index have empty value , index don't have actual value  assigned 
// in sparse array some index are missing 

// ways  to create sparse array 
const num = [1, , 2];
console.log(num);
//  using constructor 
const arr = new Array(5);
console.log(arr);
//  assign at higher index value it will created sparse array 


// array methods classify into 4 sections 

// 1. Accessor methods 
// 2. iteration methods 
// 3. mutating methods 
// 4. non-mutating methods