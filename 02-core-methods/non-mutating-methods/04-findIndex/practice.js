// Practice: findIndex

// Add your practice code here

const users = [
    { id: 1, name: "Alice" }, // 0 
    { id: 2, name: "Bob" }, // 1
    { id: 3, name: "Charlie" } // 2 
];
//  indexing started from 0 to n-1;

// array of object we created

const index = users.findIndex(user => user.id === 3);
console.log(index); // 1


// array of cart items 
const cart = [
    { id: 1, item: "Apple" },
    { id: 2, item: "Banana" },
];

// here we get the product id index 
const idx = cart.findIndex(p => p.id === 2);

// splice methods is use to remove the that product from cart 
if (idx !== -1) {
    cart.splice(idx, 1);
    // idx : target index , 1 : number  of  element we want to remove from an array 
}

console.log(cart);// splice methods is the mutating methods that will change the original array 


