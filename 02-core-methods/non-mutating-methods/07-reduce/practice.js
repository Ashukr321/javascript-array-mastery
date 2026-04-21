// Practice: reduce

const numArr = [1,2,3,4,5];

const resultSum = numArr.reduce((acc,curr)=>{
    return acc = acc+curr;
},0);

// default this return undefined so we need to  must return the accumulator;

console.log(resultSum);


const arr = [[1, 2], [3, 4], [5,[6]]];

const flat = arr.reduce((acc,curr)=>{
   return acc.concat(Array.isArray(curr) ? flatMap(curr) : curr);
},[])// our accumulator intial will be : [] empty array in which we store 

console.log(flat);   
// flat array 
// nested or recursive flat array 
