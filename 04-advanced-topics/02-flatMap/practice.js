// Practice: flatMap

// Add your practice code here

// array of object
const users = [
    { name: "Ashu", skills: ["js", "react"] },
    { name: "Rahul", skills: ["node"] }
];
  
  // get all skills in one array
  const skills = users.flatMap(user => user.skills);
  
  console.log(skills);
  // ["js", "react", "node"]

//   non mutating methods : 
// just like map but it  you need to return an array 
