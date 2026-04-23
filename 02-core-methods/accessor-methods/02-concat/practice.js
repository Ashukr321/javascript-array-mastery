// Practice: concat

const arr1 = [1,2,3,4];
const arr2 = [4,5,5];
const arr3 = arr1.concat(arr2);  

// concat method  is non mutating methods this will return the new array 
console.log(arr3);
console.log(arr1===arr2);

// concat method does't work with object but spread operator work with object also 