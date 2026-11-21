// Practice: toReversed

const arrNum = [1,2,3,4,5,5,2,2,3,4];

const reversedArr  = arrNum.toReversed(); // here this methods reverse the original array item without mutating the original array 

console.log(reversedArr);
console.log(arrNum);

// ---- More practice ----
{
  const a = [1, 2, 3];
  const b = a.toReversed();
  console.log(a, b, a === b); // [1, 2, 3] [3, 2, 1] false

  // same result as [...arr].reverse()
  console.log([...a].reverse()); // [3, 2, 1]

  // holes become undefined
  console.log([1, , 3].toReversed()); // [3, undefined, 1]

  // newest-first feed without touching the source
  const events = [
    { id: 1, text: "signed up" },
    { id: 2, text: "added to cart" },
    { id: 3, text: "paid" },
  ];
  console.log(events.toReversed().map((e) => e.text)); // ["paid", "added to cart", "signed up"]
  console.log(events[0].text); // "signed up"

  // undo history: display newest first, keep original for replay
  const history = ["typed a", "typed b", "deleted b"];
  console.log(history.toReversed()[0], history[0]); // "deleted b" "typed a"

  // flip an already sorted list for a direction toggle
  const prices = [199, 499, 999];
  const direction = "desc";
  console.log(direction === "asc" ? prices : prices.toReversed()); // [999, 499, 199]

  // shallow copy: objects are shared
  const rev = events.toReversed();
  rev[0].text = "refunded";
  console.log(events[2].text); // "refunded"
}

// --- Exercises ---
// 1. Write myToReversed(arr) without toReversed or reverse, and check it does not change arr.
// 2. Return the last 3 items of an array, newest first, without mutating it.
// 3. Check if an array of numbers is a palindrome using toReversed and every.
