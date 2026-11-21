
//  array literals :

let num = [1, 2, 3, 4];

// fill(): this is also a mutable methods : 

num.fill(12, 0)
console.log(num);//[1 ,2 , 12 , 4];

const arrNUM = new Array(5).fill(14);
console.log(arrNUM);

// ---- More practice ----
{
  // endIndex is excluded: only indexes 1 and 2 change
  console.log([1, 2, 3, 4, 5].fill(0, 1, 3)); // [1, 0, 0, 4, 5]

  // negative start counts from the end
  console.log([1, 2, 3, 4].fill(9, -2)); // [1, 2, 9, 9]

  // fill returns the SAME array
  const a = [1, 2, 3];
  console.log(a.fill(0) === a); // true

  // empty slots are skipped by map, fill makes them real
  console.log(new Array(3).fill(0).map((_, i) => i * 10)); // [0, 10, 20]

  // trap: every slot shares ONE array reference
  const badGrid = new Array(3).fill([]);
  badGrid[0].push("x");
  console.log(badGrid); // [["x"], ["x"], ["x"]]

  // fix: a factory creates a new array per slot
  const goodGrid = Array.from({ length: 3 }, () => []);
  goodGrid[0].push("x");
  console.log(goodGrid); // [["x"], [], []]

  // immutable fill (React state style)
  const seats = [true, false, true];
  const resetSeats = [...seats].fill(false);
  console.log(seats, resetSeats); // [true, false, true] [false, false, false]
}

// --- Exercises ---
// 1. Create a 3x3 tic-tac-toe board of null values where each row is a separate array.
// 2. Given [1, 2, 3, 4, 5, 6], replace only the middle two values with "*" using fill.
// 3. Write resetRange(arr, start, end) that returns a NEW array with that range set to 0 (do not mutate arr).
