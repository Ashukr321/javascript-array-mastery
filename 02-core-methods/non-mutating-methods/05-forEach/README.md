# forEach
: this is the non-mutating array methods , that does't mutate the original array 
: this is use for just loop over the array 
: this does't create the new array this is use for looping over the array  just like for loop 

: forEach(): method is a higher order function in callback function 
: (element, index, array )

forEach work internally like thia 

for(let i  = 0 ; i<arr.length ; i++>){
    callback(arr[i],i,arr);
}
<!--  it goes element by element over the all array element  -->

<!-- // we can mutate the original array inside the callback function  -->

<!-- this use for transform the original array  -->