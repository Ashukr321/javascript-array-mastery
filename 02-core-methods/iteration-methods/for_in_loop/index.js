//  for in loop use to iterate over key properties of the object 
const users = {
    name: "Ashutosh",
    age: 21,
}

console.log(users.name);

// print all keys 
for (let key in users) {
    console.log(key, " ---> ", users[key]);
}

// mostly use to loop over the object 
