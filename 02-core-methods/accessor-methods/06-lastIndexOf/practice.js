// Practice: lastIndexOf

// Add your practice code here



const arr = [1,3,4,4];
console.log(arr.lastIndexOf(4)); // search item from array if found then return the index of the items 


// ---- More practice ----
{
  // file name and extension from a path
  const path = "uploads/2026/report.final.pdf";
  const fileName = path.slice(path.lastIndexOf("/") + 1);
  console.log(fileName, fileName.slice(fileName.lastIndexOf(".") + 1)); // "report.final.pdf" "pdf"

  // last visit in a navigation history
  const history = ["/home", "/cart", "/product/7", "/cart", "/checkout"];
  const lastCart = history.lastIndexOf("/cart");
  console.log(lastCart, history.length - 1 - lastCart); // 3 1

  // items that appear only once
  const votes = ["a", "b", "a", "c"];
  console.log(votes.filter((v) => votes.indexOf(v) === votes.lastIndexOf(v))); // ["b", "c"]

  // fromIndex searches backwards from that point
  console.log([1, 2, 1, 2, 1].lastIndexOf(1, 3)); // 2
}

// --- Exercises ---
// 1. Write getExtension(fileName) that returns "" when there is no dot.
// 2. Given a log of status strings, find how many entries ago the last "error" happened.
// 3. Use indexOf and lastIndexOf to return true if an array has any duplicate value.
