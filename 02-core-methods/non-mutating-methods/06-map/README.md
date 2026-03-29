# map()

The `map()` method creates a new array populated with the results of calling a provided function on every element in the calling array.

```javascript
const array1 = [1, 4, 9, 16];
const map1 = array1.map((x) => x * 2);
console.log(map1); // Output: Array [2, 8, 18, 32]
```
`map()` does not change the original array.
