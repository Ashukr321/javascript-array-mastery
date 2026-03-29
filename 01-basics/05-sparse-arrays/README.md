# Sparse Arrays

A sparse array is an array that contains "holes" or empty slots. This happens when an index is skipped or when the `length` is set to a value greater than the number of elements.

```javascript
const sparse = [1, , 3]; // Index 1 is empty
console.log(sparse[1]); // Output: undefined
```
Sparse arrays can be created by deleting elements or by setting the `length` property to a larger value.
