// Practice: indexOf

// Add your practice code here

const userName = "Ashutosh";
console.log(userName.indexOf('u',4)); 
// index out of bounds this will gives the -1 error 


// ---- More practice ----
{
  // remove a selected id immutably
  const removeSelected = (ids, id) => {
    const i = ids.indexOf(id);
    return i === -1 ? ids : [...ids.slice(0, i), ...ids.slice(i + 1)];
  };
  console.log(removeSelected([4, 7, 9], 7), removeSelected([4, 7, 9], 1)); // [4, 9] [4, 7, 9]

  // remove duplicate tags
  const tags = ["js", "react", "js", "css"];
  console.log(tags.filter((t, i) => tags.indexOf(t) === i)); // ["js", "react", "css"]

  // split a URL into path and query
  const url = "/products?page=2&sort=price";
  const q = url.indexOf("?");
  console.log(url.slice(0, q), url.slice(q + 1)); // "/products" "page=2&sort=price"

  // find every occurrence
  const fruits = ["apple", "mango", "banana", "mango"];
  const positions = [];
  for (let i = fruits.indexOf("mango"); i !== -1; i = fruits.indexOf("mango", i + 1)) positions.push(i);
  console.log(positions); // [1, 3]

  // trap: index 0 is falsy
  console.log(fruits.indexOf("apple") ? "found" : "looks missing!"); // "looks missing!"
}

// --- Exercises ---
// 1. Write countOccurrences(arr, value) using indexOf with the fromIndex argument.
// 2. Move an item one position up in a list (swap with the previous one) using indexOf to find it.
// 3. Get the domain from "https://example.com/path" using indexOf and slice.
