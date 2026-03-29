// Practice: reduce() Mastery

const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

// 1. Use reduce to count the frequency of each fruit in the array.
// 2. The output should be an object like: { apple: 3, banana: 2, orange: 1 }
// 3. Log the frequency object.
// 4. Use reduce to calculate the total sum of numbers [10, 20, 30, 40].
// 5. Log the sum.

const frequency = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(frequency); // { apple: 3, banana: 2, orange: 1 }

const sum = [10, 20, 30, 40].reduce((acc, num) => acc + num, 0);
console.log(sum); // 100
