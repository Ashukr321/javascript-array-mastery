// Practice: Mutable vs. Immutable

const originalArr = [1, 2, 3];

// 1. Mutate the array by changing the second element to 20.
// 2. Log the mutated array.
// 3. Create a new array that adds 1 to each element of the original array (immutable way).
// 4. Log the new array and the original array.

originalArr[1] = 20;
console.log(originalArr); // [1, 20, 3]

const newArr = originalArr.map(num => num + 1);
console.log(newArr); // [2, 21, 4]
console.log(originalArr); // [1, 20, 3] (original remains unchanged)
