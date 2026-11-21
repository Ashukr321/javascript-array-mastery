// Practice: join

const  arr= ["a","s","h","u"];
console.log(typeof arr); // object
console.log(typeof arr.join("-"));// "a-s-h-u"; 
// // string 
// in join(): if we don't pass any things then it will seperate all array item by , comma 


// array to string : use join methods 
// string to array use : split methods



// ---- More practice ----
{
  // className building
  const isPrimary = true;
  const disabled = false;
  console.log(["btn", isPrimary && "btn-primary", disabled && "btn-disabled"].filter(Boolean).join(" ")); // "btn btn-primary"

  // CSV export
  const rows = [["Name", "Age"], ["Ashutosh", 21], ["Amit", 25]];
  console.log(rows.map((row) => row.join(",")).join("\n"));

  // query string and breadcrumbs
  const params = { q: "red shoes", page: 2 };
  console.log(Object.entries(params).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&")); // "q=red%20shoes&page=2"
  console.log(["Home", "Products", "Laptops"].join(" / ")); // "Home / Products / Laptops"

  // null/undefined become empty strings, nested arrays use commas
  console.log([1, null, 2, undefined, 3].join("-")); // "1--2--3"
  console.log([1, [2, 3], 4].join("-")); // "1-2,3-4"

  // reverse a string
  console.log("Ashutosh".split("").reverse().join("")); // "hsotuhsA"
}

// --- Exercises ---
// 1. Turn ["apple", "mango", "kiwi"] into "apple, mango and kiwi".
// 2. Convert an array of user objects into a CSV string with a header row.
// 3. Build a URL slug from "  Learn JS Arrays Fast " -> "learn-js-arrays-fast" (split + filter + join).
