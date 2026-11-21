
let num = [1,2,3,4,5];
num.copyWithin(0,3);// 3 startIndex se end tk jayega copy krega nd 0 index oe psast krega till startIndex
console.log(num);[4,5,3,4,5]

// ---- More practice ----
{
  // copyWithin(target, start, end): end excluded, length never changes
  console.log([1, 2, 3, 4, 5].copyWithin(0, 3)); // [4, 5, 3, 4, 5]
  console.log(["a", "b", "c", "d", "e"].copyWithin(1, 3, 4)); // ["a", "d", "c", "d", "e"]
  console.log([1, 2, 3, 4, 5].copyWithin(-2, 0)); // [1, 2, 3, 1, 2]  (clipped at the end)
  console.log([1, 2, 3, 4, 5].copyWithin(1, 0)); // [1, 1, 2, 3, 4]  (overlap is safe)

  // returns the SAME array
  const a = [1, 2, 3];
  console.log(a.copyWithin(0, 1) === a); // true

  // rolling window of sensor readings (fixed-size typed array)
  const readings = new Float32Array([20, 21, 22, 23, 24]);
  function addReading(value) {
    readings.copyWithin(0, 1);
    readings[readings.length - 1] = value;
  }
  addReading(25);
  console.log(readings); // Float32Array [21, 22, 23, 24, 25]

  // remove a player from fixed slots, keep 4 slots
  const slots = ["Ashu", "Rahul", "Priya", "Neha"];
  function removeSlot(index) {
    slots.copyWithin(index, index + 1);
    slots[slots.length - 1] = null;
  }
  removeSlot(1);
  console.log(slots); // ["Ashu", "Priya", "Neha", null]

  // repeat a pattern: copy first bar onto the second
  const beat = [1, 0, 1, 0, 0, 0, 0, 0];
  console.log(beat.copyWithin(4, 0, 4)); // [1, 0, 1, 0, 1, 0, 1, 0]

  // non-mutating: copy first
  const original = [1, 2, 3, 4, 5];
  const moved = [...original].copyWithin(0, 3);
  console.log(original, moved); // [1, 2, 3, 4, 5] [4, 5, 3, 4, 5]
}

// --- Exercises ---
// 1. Predict, then check: [10, 20, 30, 40, 50].copyWithin(2, 0, 2).
// 2. Write shiftRight(arr) that moves every element one step right using copyWithin and puts 0 at index 0 (length unchanged).
// 3. Implement your own myCopyWithin(arr, target, start, end) with a loop (handle overlap by copying the range first).
