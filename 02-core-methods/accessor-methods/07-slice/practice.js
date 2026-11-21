// Practice: slice

const str = "Ashutosh";
console.log(str.slice(0,3));// o t0 end index this will return all the string 


// apply on array 
const arr = [3,4,4,5,6,3];
console.log(arr.slice(0)); // we pass the start and index index 

// edge case :if we pass the endIndex : index out of bounds then 
console.log(arr.slice(0,10)); // it will return all the elements within the bounds

// if we pass the endIndex index out of bounds in that case also return all the element of the array 
// this methods is not return new array this will create the new array and then return the new array 
// this is the non mutating methods in js 
// -ve index will return the reverse order item of the array 
console.log(arr.slice(-3,-1)); 
// it will return the elements from the end of the array 


// ---- More practice ----
{
  // pagination
  const products = Array.from({ length: 23 }, (_, i) => "item-" + (i + 1));
  const PAGE_SIZE = 10;
  const getPage = (page) => products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  console.log(getPage(1).length, getPage(3)); // 10 ["item-21", "item-22", "item-23"]

  // "show more" comments
  const comments = ["c1", "c2", "c3", "c4", "c5"];
  let visible = 3;
  console.log(comments.slice(0, visible)); // ["c1", "c2", "c3"]
  visible += 3;
  console.log(comments.slice(0, visible)); // all 5, end is clamped

  // remove an item from state immutably
  const todos = ["a", "b", "c"];
  const index = 1;
  console.log([...todos.slice(0, index), ...todos.slice(index + 1)], todos); // ["a", "c"] ["a", "b", "c"]

  // truncate a long title
  const title = "Learn JavaScript arrays the practical way with real examples";
  console.log(title.length > 40 ? title.slice(0, 40) + "..." : title);

  // negative indexes keep the original order
  console.log([3, 4, 4, 5, 6, 3].slice(-3, -1)); // [5, 6]
}

// --- Exercises ---
// 1. Write chunk(arr, size) that splits an array into groups of `size` using slice.
// 2. Show the last 3 notifications from an array using a negative index.
// 3. Write insertAt(arr, index, item) that returns a new array using two slices and spread.
