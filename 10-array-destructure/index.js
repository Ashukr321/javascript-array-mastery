// array

// Destructuring: extracting the value from an array and assigning them to variables

const arr = [10,20,30];
const [x, ,z=20]= arr; // default value
console.log(x,z); // 10 , 30 : skipping the value


//  rest operator in javascript 
const [a,...rest]= arr;
console.log(rest); // rest operator store in array 