
const arrNum = [1,3,4,4];
const updatedArr = arrNum.with(1,300);

// with(index,value); // at that index replace old value with new value ;
console.log(updatedArr);
console.log(arrNum);


// ---- More practice ----
{
  console.log([10, 20, 30].with(-1, 99)); // [10, 20, 99]

  // out of range throws
  try {
    [1, 2, 3].with(5, 0);
  } catch (e) {
    console.log(e.name); // "RangeError"
  }

  // toggle a todo (React style): new array AND new object
  let todos = [
    { id: 1, text: "Buy milk", done: false },
    { id: 2, text: "Pay bills", done: false },
  ];
  const toggle = (list, index) => list.with(index, { ...list[index], done: !list[index].done });
  const before = todos;
  todos = toggle(todos, 0);
  console.log(todos[0].done, before[0].done); // true false

  // game board history
  const board = ["X", null, "O", null, null, null, null, null, null];
  const next = board.with(4, "X");
  console.log(next[4], board[4]); // "X" null

  // update a cart quantity (guard -1)
  const cart = [
    { id: 1, name: "Shoes", qty: 1 },
    { id: 2, name: "Watch", qty: 1 },
  ];
  const i = cart.findIndex((item) => item.id === 2);
  const updatedCart = i === -1 ? cart : cart.with(i, { ...cart[i], qty: cart[i].qty + 1 });
  console.log(updatedCart[1].qty, cart[1].qty); // 2 1
}

// --- Exercises ---
// 1. Increase the score of the player with a given id by 10 using findIndex + with.
// 2. Write myWith(arr, index, value) that supports negative indexes and throws RangeError when out of range.
// 3. Swap two elements immutably using with twice.
