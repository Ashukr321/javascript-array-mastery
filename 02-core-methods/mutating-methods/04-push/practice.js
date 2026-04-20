// Practice: push()

// add new element at the  end of the array item and it mutate the original array 

const stack = [];

// 1. Push numbers 1, 2, 3 into the stack.
// 2. Log the stack.
// 3. Push 'hello' and 'world' at once.
// 4. Log the new length and the stack.

stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack); // [1, 2, 3]

const newLength = stack.push('hello', 'world');
console.log(newLength); // 5
console.log(stack); // [1, 2, 3, 'hello', 'world']
let newArr = stack.push("Ashutosh");
console.log(newArr);
