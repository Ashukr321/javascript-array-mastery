
let str = "ashutosh";
const arrStr = Array.from(str);
console.log(arrStr);

const apiResponse = {
    0:{name :"Ashutosh",age:21},
    1:{name:"Amit",age:25},
    length:2,
}


const arrayRes = Array.from(apiResponse);
console.log(arrayRes);

// find unique 
const arr = [1,2,2,1,1,1];
const uniqueArr = Array.from(new Set(arr));
// new Set(): create the set , and we can pass into Array.from(): as arguments 
// set is iterable : 
// iterable : on which we can apply the looping on it 
// array like object : 
// 1. index : 
// 2. length :

console.log(uniqueArr);

