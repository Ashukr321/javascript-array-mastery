// Practice: includes

const arr = [1,2,3,4,5,6];
console.log(arr.includes(3,10));// true;

// 2nd argument is the searchStart index : 
//  real use case : role checked : 
// form validation : 


let str = "Ashutosh";
console.log(str.includes("A")); // true  in filter widely   use in the react web apps 





// ---- More practice ----
{
  // role check
  const user = { name: "Ashutosh", roles: ["editor", "admin"] };
  console.log(user.roles.includes("admin")); // true

  // form validation: allowed file types
  const ALLOWED = ["image/png", "image/jpeg", "image/webp"];
  const validate = (file) => (ALLOWED.includes(file.type) ? "ok" : "type not allowed");
  console.log(validate({ type: "image/png" }), validate({ type: "application/pdf" })); // ok type not allowed

  // search filter (string includes) + tag toggle (array includes)
  const products = ["Red Shoes", "Blue Shirt", "red cap"];
  const query = "red";
  console.log(products.filter((p) => p.toLowerCase().includes(query.toLowerCase()))); // ["Red Shoes", "red cap"]

  const toggle = (selected, tag) => (selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag]);
  console.log(toggle(["js"], "css"), toggle(["js", "css"], "js")); // ["js", "css"] ["css"]

  // NaN and objects
  console.log([NaN].includes(NaN), [{ id: 1 }].includes({ id: 1 })); // true false
}

// --- Exercises ---
// 1. Write hasPermission(user, permission) that returns true if user.permissions includes it.
// 2. Given a list of banned words, return true if a comment contains any of them (hint: some + includes).
// 3. Check an array of objects for an id without includes (use some), and explain why includes fails.
