// Practice: every
const arrNum =  [20,30,40,50,60];
const isAdult = arrNum.every((el,index,arr)=>el>18);

console.log(isAdult);
// this does't mutate full array 

// ---- More practice ----
{
  // stops at the first failure
  [5, 1, 8, 9].every((n) => {
    console.log("checking", n); // 5, 1 (then stops)
    return n > 2;
  });

  // empty array is true (vacuous truth)
  console.log([].every((n) => n > 100)); // true

  // using index + array: is it sorted?
  const isSorted = (arr) => arr.every((n, i, a) => i === 0 || a[i - 1] <= n);
  console.log(isSorted([1, 2, 2, 5]), isSorted([3, 1, 2])); // true false

  // real-world: form validation (one empty field blocks submit)
  const form = { name: "Ashutosh", email: "a@b.com", password: "" };
  const required = ["name", "email", "password"];
  console.log("form valid:", required.every((key) => form[key].trim() !== "")); // false

  // real-world: user must have ALL required permissions
  const userPermissions = ["read", "write", "delete"];
  console.log("can manage posts:", ["read", "write"].every((p) => userPermissions.includes(p))); // true

  // real-world: checkout guard (guard against empty cart)
  const cart = [
    { name: "Shoes", qty: 1, inStock: true },
    { name: "Shirt", qty: 2, inStock: true },
  ];
  console.log("can checkout:", cart.length > 0 && cart.every((i) => i.inStock && i.qty > 0)); // true

  // gotcha: forgot to return -> false
  console.log([1, 2, 3].every((n) => { n > 0; })); // false

  // polyfill
  Array.prototype.myEvery = function (cb, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (i in this && !cb.call(thisArg, this[i], i, this)) return false;
    }
    return true;
  };
  console.log([2, 4, 6].myEvery((n) => n % 2 === 0)); // true
}

// --- Exercises ---
// 1. Given passwords, check every one is at least 8 chars and contains a digit.
// 2. Write allSameType(arr) that returns true if every element has the same typeof as the first.
// 3. Given orders [{ items: [{ shipped }] }], check that every item in every order is shipped.
