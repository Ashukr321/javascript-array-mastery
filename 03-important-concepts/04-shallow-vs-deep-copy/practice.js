// Practice: Shallow vs. Deep Copy

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

// 1. Create a shallow copy of the users array using the spread operator.
// 2. Change the name of the first user in the copy to 'Alicia'.
// 3. Log the original users array to see if it was affected.
// 4. Create a deep copy of the users array using JSON.parse(JSON.stringify()).
// 5. Change the name of the second user in the deep copy to 'Robert'.
// 6. Log the original users array to see if it was affected.

const shallowCopy = [...users];
shallowCopy[0].name = 'Alicia';
console.log(users[0].name); // Alicia (Affected!)

const deepCopy = JSON.parse(JSON.stringify(users));
deepCopy[1].name = 'Robert';
console.log(users[1].name); // Bob (Not affected!)
