// Practice: filter
// it create the new array it is a hof : in callback function 
// each item of the array goes and check condition if the condition is true then added into newly created  array 
// and return it 

// it does't mutate the original array 



// filter((currentElement,index, array)=>{});

// index is refer to the current index  of the element 
// array on which we apply the filter methods 
// we can also apply on array of object 

const users = [
    {name :"ASHUTOSH",age:21},
    {
        name:"amit",age:17,
    },
    {
        name:"sumit",age:25
    }
]

const adult  = users.filter((user)=>user.age>=18);

console.log(adult);
// widely use in the react application for the filtering the data;