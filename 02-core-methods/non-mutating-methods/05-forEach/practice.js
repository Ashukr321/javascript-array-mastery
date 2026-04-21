let arr= [1,2,3];
// here we mutate original array 
arr.forEach((el,i)=>{
  arr[i] = (el*4)
})

console.log(arr);
// for each method does't return anything default it return undefined