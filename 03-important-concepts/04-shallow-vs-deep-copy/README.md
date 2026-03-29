# Shallow vs. Deep Copy

Understanding the difference between shallow and deep copies is crucial for working with nested arrays and objects.

- **Shallow Copy**: Only the top-level elements are copied. Nested elements still reference the original.
- **Deep Copy**: All levels of the array are recursively copied.

```javascript
const original = [[1], [2]];
const shallow = [...original]; // Shallow copy
shallow[0][0] = 100;
console.log(original[0][0]); // 100 (affected!)

const deep = JSON.parse(JSON.stringify(original)); // Simple deep copy
deep[1][0] = 200;
console.log(original[1][0]); // 2 (not affected!)
```
Methods like `slice`, `concat`, and the spread operator `[...]` create shallow copies.
