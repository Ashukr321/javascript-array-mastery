// Practice: Length Property

const names = ['Alice', 'Bob', 'Charlie', 'David'];

// 1. Log the number of names in the array.
// 2. Truncate the array to only have the first two names.
// 3. Log the updated array.
// 4. Set the length to 5 and log the array.

console.log(names.length); // 4
names.length = 2;
console.log(names); // ['Alice', 'Bob']
names.length = 5;
console.log(names); // ['Alice', 'Bob', empty x 3]
