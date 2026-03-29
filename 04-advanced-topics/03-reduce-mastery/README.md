# reduce() Mastery

The `reduce()` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value.

```javascript
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum); // 10
```
`reduce()` is one of the most powerful and flexible array methods in JavaScript.
