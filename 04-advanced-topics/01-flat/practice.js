// Practice: flat
// const arr = [12,3,[3,4]];

// console.log(arr.flat());// [12,3,3,4];

// const arr = [1, [2, [3, [4]]]];

// console.log(arr.flat(1)); // [1, 2, [3, [4]]]
// console.log(arr.flat(2)); // [1, 2, 3, [4]]
// console.log(arr.flat(3)); // [1, 2, 3, 4]


// // infinity 

// console.log(arr.flat(Infinity))// flat all level of depth 

// // default depth is 1: 


// Polyfill idea (interview level 🔥)
//  use recursive 
function flatArray(arr) {
  return arr.reduce((acc, curr) => {
    return acc.concat(Array.isArray(curr) ? flatArray(curr) : curr);
  }, []);
}



const arr = [1, [2, [3, [4]]]];
console.log(flatArray(arr));