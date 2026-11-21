// Practice: new-array

const arr = new Array(5); // [undefined, undefined, undefined, undefined, undefined]'
console.log(arr);


const arrNum = Array.of(5, 10, 20);//[5]

console.log(arrNum);

//  array : reference data type : object : object store in heap memory 

// ---- More practice ----

// new Array(5) actually creates EMPTY slots (holes) that read as undefined
const holes = new Array(5);
console.log(holes.length); // 5
console.log(holes[0]); // undefined
console.log(0 in holes); // false -> the index does not exist

// several args (or a non-number) become elements
console.log(new Array(5, 10, 20)); // [5, 10, 20]
console.log(new Array("5")); // ['5']

// Array.of always treats args as elements
console.log(Array.of(5)); // [5]

// map skips holes
console.log(new Array(3).map(() => 1)); // [ <3 empty items> ]
console.log(new Array(3).fill(0)); // [0, 0, 0]
console.log(Array.from({ length: 3 }, (_, i) => i)); // [0, 1, 2]

// arrays are references (objects in heap memory)
const a = new Array(1, 2, 3);
const b = a;
b.push(4);
console.log(a); // [1, 2, 3, 4]
console.log(typeof a, Array.isArray(a)); // object true

// invalid length throws
try {
  new Array(-1);
} catch (e) {
  console.log(e.name, e.message); // RangeError Invalid array length
}

// --- Exercises ---
// 1. Create an array [1, 2, ..., 10] without writing the numbers by hand.
// 2. Create a 3x3 grid (array of arrays) filled with 0. Make sure the rows are
//    separate arrays (hint: why is new Array(3).fill(new Array(3).fill(0)) a bug?).
// 3. Write isRealArray(value) that returns true only for arrays (not objects or strings).

