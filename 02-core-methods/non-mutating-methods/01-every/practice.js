// Practice: every
const arrNum =  [20,30,40,50,60];
const isAdult = arrNum.every((el,index,arr)=>el>18);

console.log(isAdult);
// this does't mutate full array 