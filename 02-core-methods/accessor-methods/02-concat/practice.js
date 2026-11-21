// Practice: concat

const arr1 = [1,2,3,4];
const arr2 = [4,5,5];
const arr3 = arr1.concat(arr2);  

// concat method  is non mutating methods this will return the new array 
console.log(arr3);
console.log(arr1===arr2);

// concat method does't work with object but spread operator work with object also 

// ---- More practice ----
{
  // "load more": append the next API page
  let posts = [{ id: 1 }, { id: 2 }];
  const nextPage = { items: [{ id: 3 }, { id: 4 }] };
  const before = posts;
  posts = posts.concat(nextPage.items);
  console.log(posts.length, before.length, posts === before); // 4 2 false

  // add to cart without mutating (non-array arg is added as one item)
  const cart = [{ name: "pen", qty: 2 }];
  const newCart = cart.concat({ name: "book", qty: 1 });
  console.log(cart.length, newCart.length); // 1 2

  // default + user tags
  console.log(["all"].concat(["react", "node"])); // ["all", "react", "node"]

  // only one level is flattened
  console.log([1].concat([2, [3, 4]], 5)); // [1, 2, [3, 4], 5]

  // objects: merge with spread, not concat
  const a = { theme: "dark" };
  const b = { lang: "en" };
  console.log({ ...a, ...b }); // { theme: "dark", lang: "en" }
}

// --- Exercises ---
// 1. Merge three arrays of product ids with one concat call, then remove duplicates.
// 2. Write appendIfMissing(list, item) that returns a new array (concat) only if item is not already there.
// 3. Show with code that concat is shallow: change an object in the new array and log the old one.
