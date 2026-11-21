// Practice: reverse

// Add your practice code here
let num = [1,2,4];
const newArr = [...num].reverse(); // reverse without mutating original array here we do shallow copy 

console.log(newArr);

console.log(num===newArr)// true bec both are same 

// ---- More practice ----
{
  // reverse mutates AND returns the same array
  const a = [1, 2, 3];
  const b = a.reverse();
  console.log(a, b, a === b); // [3, 2, 1] [3, 2, 1] true

  // copy first to keep the original
  const original = [1, 2, 3];
  const copy = [...original].reverse();
  console.log(original, copy, original === copy); // [1, 2, 3] [3, 2, 1] false

  // modern non-mutating version (ES2023)
  console.log(original.toReversed()); // [3, 2, 1]

  // reverse a string
  console.log("hello".split("").reverse().join("")); // "olleh"

  // newest-first list without touching the source
  const comments = [
    { id: 1, text: "first" },
    { id: 2, text: "second" },
    { id: 3, text: "third" },
  ];
  console.log(comments.toReversed().map((c) => c.text)); // ["third", "second", "first"]

  // shallow copy: objects are still shared
  const reversed = [...comments].reverse();
  reversed[0].text = "changed";
  console.log(comments[2].text); // "changed"
}

// --- Exercises ---
// 1. Reverse an array in place without using reverse (swap from both ends).
// 2. Check if a word is a palindrome using reverse.
// 3. Reverse only the first k elements of an array, leaving the rest as is.
