// for of loop use to iterate over iterables 

// this gives us actual value not index 


const arr = [12,3,4,5,5];
// this gives the value not index 
for(let i of arr){
    console.log(i);
}
// shorthand for the the for loop , modern way to loop over it 

// string 
const str = "Ashutosh";
for(let ch of str){
    console.log(ch);
}

const users = [
    { id: 1, name: "Ashu" },
    { id: 2, name: "Rahul" }
  ];

//   loop all the name 

for(let user of users){
    // .user is the single object of the array 
   console.log(user.name) // object destruct it 
}

for(let {name,id} of users){
    console.log(name,"------>",id)
}
