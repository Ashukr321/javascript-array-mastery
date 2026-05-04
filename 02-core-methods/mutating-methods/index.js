
//  array literal : 
const data = [1, 2, 4, 5, 5];

console.log(data);
console.log(data.length);

// push(); : add element in the end of the array ;
data.push(6);
console.log(data);// [1, 2, 4, 5, 5, 6]


const copyData = data;
copyData.push(7);

console.log("--------------------- copy data  array --------------")
console.log(data);
console.log(copyData);


// pop(); : remove element from the end of the array ; 

const arrNum = new Array(4, 12, 123, 123, 23);
console.log("before pop:   ", arrNum)
arrNum.pop();
console.log("After pop  ", arrNum)


console.log("------------- shift()-----------")
// shift: remove element from starting of the array 

const arrNum2 = Array.of(1, 2, 3, 23, 2);
console.log(arrNum2);

console.log("before using shift(): methods --", arrNum2);
arrNum2.shift();
console.log("after using shift(): methods --", arrNum2);

//  ------------- unshift()--------------- 

console.log("-------------------------")

const num = [4, 5, 6];
console.log("before using unshift(): methods --", num);
num.unshift(1, 2, 3);
console.log("after using unshift(1,2,3): methods --", num);


// mutable methods : it will change the original array

// 1. push(): add element in the end of the array
// 2. pop(): remove element from end of the array
// 3. shift(): remove element from start of the array
// 4. unshift(): add element at begin of the array 