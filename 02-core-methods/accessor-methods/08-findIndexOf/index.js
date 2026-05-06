const users = [
    { name: "Ashutosh", age: 21, id: 1 },
    { name: "Ashutosh", age: 21, id: 2 }
]

const startIndex = users.findIndex((usr) => usr.id == 2);
// console.log(startIndex);

users.splice(startIndex, 1);// remove from users; // mutating methods

console.log(users);