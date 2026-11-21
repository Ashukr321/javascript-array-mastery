
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



// ---- More practice ----
{
  // API response transformation (convert + map in one step)
  const res = { 0: { id: 1, title: "Post A" }, 1: { id: 2, title: "Post B" }, length: 2 };
  console.log(Array.from(res, (post) => post.title)); // ["Post A", "Post B"]

  // pagination buttons / skeleton placeholders
  const totalPages = 5;
  console.log(Array.from({ length: totalPages }, (_, i) => i + 1)); // [1, 2, 3, 4, 5]
  console.log(Array.from({ length: 3 }, (_, i) => "skeleton-" + i)); // ["skeleton-0", "skeleton-1", "skeleton-2"]

  // unique tags from posts
  const posts = [{ tags: ["js", "react"] }, { tags: ["react", "css"] }];
  console.log(Array.from(new Set(posts.flatMap((p) => p.tags)))); // ["js", "react", "css"]

  // NodeList-like object (what querySelectorAll gives you in the browser)
  const nodeListLike = { 0: { value: "a" }, 1: { value: "b" }, length: 2 };
  console.log(Array.from(nodeListLike, (el) => el.value)); // ["a", "b"]

  // only length is required; no length means []
  console.log(Array.from({ length: 2 }), Array.from({ 0: "x" })); // [undefined, undefined] []

  // Map to array
  console.log(Array.from(new Map([["apple", 5], ["mango", 0]]).keys())); // ["apple", "mango"]
}

// --- Exercises ---
// 1. Create a 3x3 grid (array of arrays) filled with 0 using Array.from twice.
// 2. Convert "1,2,3,4" into [1, 2, 3, 4] numbers using Array.from with a map function (hint: split first).
// 3. Build an array of the next 7 dates (as strings) starting today with Array.from({ length: 7 }, ...).
