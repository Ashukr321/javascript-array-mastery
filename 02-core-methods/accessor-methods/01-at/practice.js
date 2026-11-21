// Practice: at

const arr = [1,2,3,4,5];

// arr.at(-1);// 5

// console.log(arr.at(-10));// 5 //  index out of bound : give undefined
//problem state get the 2nd last element of the array 
console.log(arr.at(-2));

// 4 
//  [] // work with only positive index 
//  ()// work with both positive and negative index fine 
// this methods work with string also fine

// ---- More practice ----
{
  // last message in a chat
  const messages = [{ text: "hi" }, { text: "how are you?" }, { text: "see you" }];
  console.log(messages.at(-1).text); // "see you"
  console.log([].at(-1)); // undefined (empty chat, no crash)

  // current page in breadcrumbs
  const crumbs = ["Home", "Products", "Laptops"];
  console.log(crumbs.at(-1), crumbs.slice(0, -1)); // "Laptops" ["Home", "Products"]

  // price change from API data
  const prices = [{ day: "Mon", value: 100 }, { day: "Tue", value: 104 }, { day: "Wed", value: 101 }];
  console.log(prices.at(-1).value - prices.at(-2).value); // -3

  // file extension
  console.log("report.final.pdf".split(".").at(-1)); // "pdf"

  // brackets do not count from the end
  console.log([1, 2, 3][-1], [1, 2, 3].at(-1)); // undefined 3
}

// --- Exercises ---
// 1. Write getLast(arr, n) that returns the nth item from the end (1 = last) using at(), or null if out of range.
// 2. Given an array of order objects sorted by date, print the newest and the oldest order id with at().
// 3. Check if a string is a palindrome by comparing str.at(i) with str.at(-1 - i).
