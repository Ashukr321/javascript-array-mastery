// Practice: map()

const numbers = [1, 2, 3, 4, 5];

// 1. Create a new array that contains the squares of each number.
// 2. Log the squares array.
// 3. Create a new array of strings that says "Number is: X" for each number.
// 4. Log the strings array and the original numbers array.

const squares = numbers.map(n => n * n);
console.log(squares); // [1, 4, 9, 16, 25]

const strings = numbers.map(n => `Number is: ${n}`);
console.log(strings); // ["Number is: 1", "Number is: 2", ...]
console.log(numbers); // [1, 2, 3, 4, 5] (original is unchanged)
