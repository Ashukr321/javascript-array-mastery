# Array vs. Object

In JavaScript, arrays are objects. However, they are optimized for ordered collections of data and have a set of built-in methods (like `push`, `pop`, `map`, etc.).

```javascript
const fruitsArr = ['Apple', 'Banana']; // Array
const fruitsObj = { 0: 'Apple', 1: 'Banana' }; // Object (mimicking array indexing)

console.log(Array.isArray(fruitsArr)); // true
console.log(Array.isArray(fruitsObj)); // false
```
Arrays have a `length` property and built-in methods that objects don't have.
