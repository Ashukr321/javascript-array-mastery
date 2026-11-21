// Practice: array-of


// Add your practice code here

const arr = Array.of(1,1,3);
// we can't create the sparse array 

console.log(arr);


// iterables in javascript : 
array 
map 
set 
string

// ---- More practice ----
{
  // wrapping a value from an API
  const res = { quantity: "7" };
  const qty = Number(res.quantity);
  console.log(Array.of(qty), Array(qty)); // [7] [ <7 empty items> ]

  // initial selected ids (what you would pass to useState)
  const defaultProductId = 42;
  console.log(Array.of(defaultProductId)); // [42]

  // generic helper and typed arrays
  const toList = (...values) => Array.of(...values);
  console.log(toList(5), toList(5, 6)); // [5] [5, 6]
  console.log(Uint8Array.of(0x89, 0x50, 0x4e, 0x47)); // PNG signature bytes

  // Array.of does not convert, Array.from does
  console.log(Array.of("abc"), Array.from("abc")); // ["abc"] ["a", "b", "c"]
  console.log(Array(3).length, Array.of(3).length, Array(3, 4).length); // 3 1 2
}

// --- Exercises ---
// 1. Write safeArray(n) that always returns [n] for any single value (number or not).
// 2. Log the difference between new Array(2) and Array.of(2) with .map((x) => "x").
// 3. Write your own myOf(...items) and compare its output with Array.of for 0, 1 and 3 arguments.
