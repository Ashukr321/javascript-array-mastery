// Practice: Sparse Arrays

const sparseArr = [1, , 3];

// 1. Log the length of the sparse array.
// 2. Check the value at index 1.
// 3. Set the length to 5 and log the array.
// 4. Delete the first element and log the array.

console.log(sparseArr.length); // 3
console.log(sparseArr[1]); // undefined

sparseArr.length = 5;
console.log(sparseArr); // [1, <1 empty item>, 3, <2 empty items>]

delete sparseArr[0];
console.log(sparseArr); // [<1 empty item>, <1 empty item>, 3, <2 empty items>]
