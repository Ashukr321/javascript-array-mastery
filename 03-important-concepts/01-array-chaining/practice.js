// Practice: array-chaining

// calling the multiple array methods one after another one method return the array the output of the first methods will be become array of the next methods 

// that create the chain structure of calling the function 

// multiple methods are called sequently that know as array chaining in javascript 


//  array chaining is possible because many array methods are return the new array 
// map , filter , sort();
// 

// array of object 
const sales = [
    { item: 'Laptop', price: 1000, tax: 0.1 }, // object 
    { item: 'Mouse', price: 20, tax: 0.05 }, // object
    { item: 'Monitor', price: 200, tax: 0.1 } // object
];
  
  const totalTax = sales
    .filter(sale => sale.price > 50)           // 1. Keep only expensive items
    .map(sale => sale.price * sale.tax)        // 2. Calculate tax for each  array of tax prices : []
    .reduce((acc, tax) => acc + tax, 0);       // 3. Sum the taxes // calculate the sum of all tax prices : 
console.log(totalTax);


// edge case can be for safety purpose we have to to use the optional chaining ?.