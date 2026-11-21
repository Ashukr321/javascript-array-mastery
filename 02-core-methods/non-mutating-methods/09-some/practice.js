// Practice: some

const arrNum = [1,2,3,4,5,6];
console.log(arrNum.some((el)=>el%2==0))// check for the even number it will give true 
// 1 array element is satisfy the condition true and it will stop further to check validate condition 

// ---- More practice ----
{
  // stops at the first match
  [1, 2, 3, 4].some((n) => {
    console.log("checking", n); // 1, 2 (then stops)
    return n % 2 === 0;
  });

  // empty array is false
  console.log([].some((n) => n > 0)); // false

  // some vs includes with objects
  const users = [{ id: 1 }, { id: 2 }];
  console.log(users.includes({ id: 2 })); // false (different reference)
  console.log(users.some((u) => u.id === 2)); // true

  // real-world: any validation error -> show banner
  const errors = { name: "", email: "Invalid email", password: "" };
  console.log("has errors:", Object.values(errors).some((msg) => msg !== "")); // true

  // real-world: user has ANY allowed role
  const user = { name: "Ashutosh", roles: ["editor", "viewer"] };
  console.log("can see dashboard:", ["admin", "editor"].some((r) => user.roles.includes(r))); // true

  // real-world: avoid duplicates in cart
  let cart = [{ id: 1, name: "Shoes" }];
  const product = { id: 1, name: "Shoes" };
  if (!cart.some((item) => item.id === product.id)) cart = [...cart, product];
  console.log(cart.length); // 1

  // every expressed with some
  const nums = [2, 4, 6];
  console.log(!nums.some((n) => n % 2 !== 0) === nums.every((n) => n % 2 === 0)); // true

  // polyfill
  Array.prototype.mySome = function (cb, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (i in this && cb.call(thisArg, this[i], i, this)) return true;
    }
    return false;
  };
  console.log([1, 3, 5].mySome((n) => n > 4)); // true
}

// --- Exercises ---
// 1. Check if any product in a list has price 0 (free item).
// 2. Write hasDuplicates(arr) using some (hint: compare indexOf with the current index).
// 3. Given a list of files [{ name, size }], check if any file is larger than 5 MB.
