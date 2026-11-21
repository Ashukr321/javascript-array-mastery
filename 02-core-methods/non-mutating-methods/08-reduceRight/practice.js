// Practice: reduceRight

const letters = ["a", "b", "c"];
console.log(letters.reduce((acc, x) => acc + x, "")); // abc
console.log(letters.reduceRight((acc, x) => acc + x, "")); // cba

// sum is the same either way
console.log([1, 2, 3].reduceRight((acc, n) => acc + n, 0)); // 6

// index counts down
[10, 20, 30].reduceRight((acc, val, i) => {
  console.log(i, val); // 2 30, 1 20, 0 10
  return acc + val;
}, 0);

// compose: rightmost function runs first
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const add1 = (n) => n + 1;
const double = (n) => n * 2;
console.log(compose(add1, double)(5)); // 11

// build nested object from the inside out
const path = ["a", "b", "c"];
console.log(JSON.stringify(path.reduceRight((acc, key) => ({ [key]: acc }), {}))); // {"a":{"b":{"c":{}}}}

// latest-first feed from oldest-first API data
const events = [
  { id: 1, text: "signed up" },
  { id: 2, text: "added card" },
  { id: 3, text: "placed order" },
];
console.log(events.reduceRight((acc, e) => [...acc, e.text], []));

// empty array without initial value throws
try {
  [].reduceRight((a, b) => a + b);
} catch (e) {
  console.log(e.name, e.message);
}
console.log([].reduceRight((a, b) => a + b, 0)); // 0

// --- Exercises ---
// 1. Reverse the string "hello" using split("") and reduceRight.
// 2. Write pipe(...fns) with reduce and compose(...fns) with reduceRight; check they give
//    different results for (add1, double) applied to 5.
// 3. Given ["home", "products", "shoes"], build the breadcrumb string
//    "shoes < products < home" with reduceRight.
