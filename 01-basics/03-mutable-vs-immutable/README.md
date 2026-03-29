# Mutable vs. Immutable

Arrays in JavaScript are mutable objects, meaning their elements can be changed, added, or removed.

```javascript
const arr = [1, 2, 3];
arr[0] = 10; // Mutating the array
console.log(arr); // [10, 2, 3]
```
To treat an array as immutable, you should use methods that return a new array (like `map`, `filter`, `slice`) instead of modifying the original.
